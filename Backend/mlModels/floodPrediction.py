import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import numpy as np
import requests
import statsmodels.api as sm
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score,precision_score, recall_score, f1_score
from joblib import dump
from sklearn.metrics import roc_curve, auc
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report

# Read Excel file
df = pd.read_csv('./Backend/datasets/Flood_DF.csv')
encoded_df = pd.get_dummies(df['station_name'])
# Concatenate the encoded columns with the original DataFrame
df = pd.concat([df, encoded_df], axis=1)

df['Date'] = pd.to_datetime(df['Date'])
# Extract year, month, and day components
df['Year'] = df['Date'].dt.year
df['Month'] = df['Date'].dt.month
df['Day'] = df['Date'].dt.day
df['Flood'] = df['Flood'].replace({'YES': 1, 'NO': 0})

#check unique values for flood
unique_values_flood = df['Flood'].unique()
print(unique_values_flood)
unique_counts = df['Flood'].value_counts()
unique_values_rainfall = df['Rainfall_avg'].unique()
print(unique_values_rainfall)

#get the average temperature of a day
df['Temp_avg'] = (df['Temp_Max'] + df['Temp_Min']) / 2
df['Temp_avg'] = df['Temp_avg'].round(1) #Round to have one decimal place


#divide data points
num_groups = len(df) // 7

# Calculate the number of rows in the incomplete group
incomplete_rows = len(df) % 7

# Generate the row numbers for each complete group of 7 rows
row_numbers = [i+1 for i in range(num_groups) for _ in range(7)]

# Generate the row numbers for the incomplete group
row_numbers += [num_groups + 1] * incomplete_rows

# Assign the row numbers to the new column
df['row_number'] = row_numbers

#
rows_to_drop = list(range(0, 2))  # Row numbers to drop
# Drop the specified rows using the .drop() method
df = df.drop(rows_to_drop)

rows_to_drop = list(range(2, 7))  # Row numbers to drop
# Drop the specified rows using the .drop() method
df = df.drop(rows_to_drop)


#group rainfall for a whole week
grouped_data = df.groupby('row_number').agg({'Rainfall_avg': 'mean'})
# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_avg'))

#group the data for a whole week
grouped_data = df.groupby('row_number').agg({'Temp_avg': 'mean'})
# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_avg'))
df['Temp_avg_avg'] = df['Temp_avg_avg'].round(1)
df['Rainfall_avg_avg'] = df['Rainfall_avg_avg'].round(1)

#Take the maximum value of a flood from '0' and '1'
grouped_data = df.groupby('row_number').agg({'Flood': 'max'})
# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_max'))

# Drop columns that are np longer needed
columns_to_drop = ['Date','Rainfall_avg', 'Temp_Max','Temp_Min','Flood','Day','RATNAPURA','Year','Month','Rainfall_avg','Temp_Max','Temp_Min','Temp_avg','id', 'longitude','latitude', 'elevation','code','station_name','RATNAPURA']
df = df.drop(columns_to_drop, axis=1)
df = df.drop_duplicates(subset=['row_number'])

#check the unique values in the flood_max column
unique_counts = df['Flood_max'].value_counts()
print(unique_counts)

columns_to_drop = ['row_number']
df = df.drop(columns_to_drop, axis=1)
#check the correlation between the variables
correlation_matrix = df.corr()
print(correlation_matrix)


X_train, X_test, y_train, y_test = train_test_split(df.drop('Flood_max', axis=1), 
df['Flood_max'], test_size=0.2, stratify=df['Flood_max'], random_state=42)

# Add a constant column to X for the intercept
X = sm.add_constant(X_test)

# Fit the OLS (Ordinary Least Squares) model
model = sm.OLS(y_test, X)
results = model.fit()

# Get the correlation, p-values, and t-values
correlation = results.rsquared
p_values = results.pvalues[1:]  # Exclude the constant term
t_values = results.tvalues[1:]  # Exclude the constant term

# Print the results
print("Correlation:", correlation)
print("P-values:", p_values)
print("T-values:", t_values)

# Set the threshold values for p-values and t-values
p_threshold = 0.05  # Adjust this value as needed
t_threshold = 1.96  # Adjust this value as needed

# Create an instance of the SVC model
model = SVC()

# Select the best features based on p-values and t-values
selected_features = []
for i in range(len(p_values)):
    if p_values[i] < p_threshold and abs(t_values[i]) > t_threshold:
        selected_features.append(X.columns[i+1])  # Add 1 to skip the constant term

# Print the selected features
print("Selected Features:", selected_features)

# Fit the model to the training data
model.fit(X_train, y_train)

# Obtain predictions on testing data
input_arr = [47348834.928571   ,  0.00 ]
y_pred = model.predict(X_test)
# y_pred = model.predict(X_test)
# # Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(y_pred)
print(y_test)

from imblearn.over_sampling import SMOTE

# Create an instance of SMOTE
smote = SMOTE(random_state=42)

# Apply SMOTE to the training data
X_train_smote, y_train_smote = smote.fit_resample(X_train, y_train)

# Fit a SVC model on the oversampled data
logreg_smote =SVC(random_state=42)
logreg_smote.fit(X_train_smote, y_train_smote)
input=[10,23]
# Predict on the test data
y_pred_smote = logreg_smote.predict(X_test)
print(y_pred_smote)
# Calculate accuracy for the SMOTE model
accuracy_smote = accuracy_score(y_test, y_pred_smote)
print("Accuracy with SMOTE:", accuracy_smote)

# Calculate precision
precision = precision_score(y_test, y_pred_smote, average='weighted')  # You can use 'micro', 'macro', 'weighted', or None
print("Precision:", precision)

# Calculate recall
recall = recall_score(y_test, y_pred_smote, average='weighted')  # You can use 'micro', 'macro', 'weighted', or None
print("Recall:", recall)

# Calculate F1-score
f1 = f1_score(y_test, y_pred_smote, average='weighted')  # You can use 'micro', 'macro', 'weighted', or None
print("F1-score:", f1)

# # Calculate ROC curve and AUC for the SMOTE model
fpr_smote, tpr_smote, _ = roc_curve(y_test, y_pred_smote)
roc_auc_smote = auc(fpr_smote, tpr_smote)

# # Plot ROC curves and display AUC for both models, including SMOTE
plt.figure(figsize=(8, 6))

plt.plot(fpr_smote, tpr_smote, color='green', lw=2, label=f'SMOTE (AUC = {roc_auc_smote:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic')
plt.legend(loc='lower right')
plt.show()


cm = confusion_matrix(y_test, y_pred_smote)

# Generate classification report
report = classification_report(y_test, y_pred_smote)

# Plot confusion matrix
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, cmap='Blues')
plt.xlabel('Predicted Classes')
plt.ylabel('Actual Classes')
plt.title('Confusion Matrix')
plt.show()

# Plot classification report
plt.figure(figsize=(8, 6))
sns.heatmap(pd.DataFrame.from_dict(classification_report(y_test, y_pred_smote, output_dict=True)).iloc[:-1, :].T, annot=True, cmap='Blues')
plt.xlabel('Metrics')
plt.ylabel('Classes')
plt.title('Classification Report')
plt.show()
# dump (logreg_smote,'./Backend/mlModels/floodPredictionModel.joblib')