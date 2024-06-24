import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import numpy as np
import requests
import statsmodels.api as sm
from sklearn.linear_model import LogisticRegression
import seaborn as sns
from sklearn.metrics import roc_curve, auc
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.metrics import precision_score, recall_score, confusion_matrix
from sklearn.metrics import f1_score
from sklearn.metrics import accuracy_score, roc_auc_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix
from imblearn.over_sampling import RandomOverSampler
from imblearn.under_sampling import RandomUnderSampler
from joblib import dump
from statsmodels.tsa.stattools import adfuller

# Read Excel file
df = pd.read_csv('./Backend/datasets/Thunder_Rathnapura.csv')
print(df)

# Drop the unwanted Columns
columns_to_drop = ['id', 'longitude','latitude', 'elevation','code']
df = df.drop(columns=columns_to_drop)

encoded_df = pd.get_dummies(df['station_name'])

# Concatenate the encoded columns with the original DataFrame
df = pd.concat([df, encoded_df], axis=1)

columns_to_drop = ['station_name']
df = df.drop(columns=columns_to_drop)

df['Date'] = pd.to_datetime(df['Date'])

# Extract year, month, and day components
df['Year'] = df['Date'].dt.year
df['Month'] = df['Date'].dt.month
df['Day'] = df['Date'].dt.day

columns_to_drop = ['Date']
df = df.drop(columns=columns_to_drop)

df['Thunderstrom'] = df['Thunderstrom'].replace({'YES': 1, 'NO': 0})

# Check unique values
unique_values = df['Thunderstrom'].unique()
unique_values = df['Temp_Min'].unique()
unique_values = df['Temp_Max'].unique()
unique_values = df['Rainfall_avg'].unique()
print(unique_values)

df['Rainfall_avg'] = df['Rainfall_avg'].astype(float).round(1)

# Get the unique values in the float column
unique_values = df['Rainfall_avg'].unique()
pd.set_option('display.max_colwidth', None)

decimal_place = 2
df['Rainfall_avg'] = df['Rainfall_avg'].round(decimal_place)

# Set the display options to show full DataFrame
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

decimal_place = 2
df['Temp_Max'] = df['Temp_Max'].round(decimal_place)
df['Temp_Min'] = df['Temp_Min'].round(decimal_place)
correlation_matrix = df.corr()
correlation_matrix

df.head()

df['Rainfall_avg'] = df['Rainfall_avg'].astype(float).round(1)
df['Temp_Max'] = df['Temp_Max'].round(2)
df['Temp_Min'] = df['Temp_Min'].round(2)

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

grouped_data = df.groupby('row_number').agg({'Rainfall_avg': 'mean'})

# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_avg'))

grouped_data = df.groupby('row_number').agg({'Temp_Max': 'mean'})

# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_avg'))

grouped_data = df.groupby('row_number').agg({'Temp_Min': 'mean'})

# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_avg'))

grouped_data = df.groupby('row_number').agg({'Thunderstrom': 'max'})

# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_max'))

columns_to_drop = ['Rainfall_avg', 'Temp_Max','Temp_Min','Thunderstrom','Day','RATNAPURA','Year','Month']
df = df.drop(columns_to_drop, axis=1)

df = df.drop_duplicates(subset=['row_number'])

unique_counts = df['Thunderstrom_max'].value_counts()

unique_counts

columns_to_drop = ['row_number']
df = df.drop(columns_to_drop, axis=1)

X_train, X_test, y_train, y_test = train_test_split(df.drop('Thunderstrom_max', axis=1),
                                                    df['Thunderstrom_max'], test_size=0.2, stratify=df['Thunderstrom_max'], random_state=42)

print("Length of X_train:", len(X_train))
print("Length of X_test:", len(X_test))
print("Length of y_train:", len(y_train))
print("Length of y_test:", len(y_test))

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
t_threshold = 1.96 # Adjust this value as needed

# Select the best features based on p-values and t-values
selected_features = []
for i in range(len(p_values)):
    if p_values[i] < p_threshold and abs(t_values[i]) > t_threshold:
        selected_features.append(X.columns[i+1])  # Add 1 to skip the constant term

# Print the selected features
print("Selected Features:", selected_features)

df.head()

from sklearn.linear_model import LogisticRegression

# Assuming you have already split your data into X_train and y_train

# Create an instance of the LogisticRegression model
model = LogisticRegression()

# Fit the model to the training data
model.fit(X_train, y_train)

from sklearn.metrics import accuracy_score

# Assuming you have a logistic regression model named 'model'
model = LogisticRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy with LogisticRegression:", accuracy)

print("y_pred:", y_pred, "\n")
print("y_test:", y_test, "\n")
print("Length of y_pred:", len(y_pred), "\n")

print(X_test.head())  # Prints the first few rows of the testing features
print(y_test.head())

print(y_pred)

y_test.shape

y_pred.shape

import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report
cm = confusion_matrix(y_test, y_pred)

# Generate classification report
report = classification_report(y_test, y_pred)

# Plot confusion matrix
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, cmap='Blues')
plt.xlabel('Predicted Classes')
plt.ylabel('Actual Classes')
plt.title('Confusion Matrix with Logistic Regression')
plt.show()

# Plot classification report
plt.figure(figsize=(8, 6))
sns.heatmap(pd.DataFrame.from_dict(classification_report(y_test, y_pred, output_dict=True)).iloc[:-1, :].T, annot=True, cmap='Blues')
plt.xlabel('Metrics')
plt.ylabel('Classes')
plt.title('Classification Report with Logistic Regression')
plt.show()

from imblearn.over_sampling import RandomOverSampler

oversampler = RandomOverSampler(random_state=42)
X_train_over, y_train_over = oversampler.fit_resample(X_train, y_train)

from imblearn.under_sampling import RandomUnderSampler

undersampler = RandomUnderSampler(random_state=42)
X_train_under, y_train_under = undersampler.fit_resample(X_train, y_train)

# model = LogisticRegression(random_state=42)
# model.fit(X_train, y_train)
# input_arr=[15.25, 34.328, 22.95]
# y_pred = model.predict([input_arr])
# print("Predicted class:", y_pred)

from sklearn.metrics import roc_curve, auc

# Fit the logistic regression model with oversampling
logreg_over = LogisticRegression(random_state=42)
logreg_over.fit(X_train_over, y_train_over)

# Obtain predictions on testing data with oversampling
y_pred_over = logreg_over.predict(X_test)

# Calculate ROC curve and AUC
fpr_over, tpr_over, _ = roc_curve(y_test, y_pred_over)
roc_auc_over = auc(fpr_over, tpr_over)

# Fit the logistic regression model with undersampling
logreg_under = LogisticRegression(random_state=42)
logreg_under.fit(X_train_under, y_train_under)

# Obtain predictions on testing data with undersampling
y_pred_under = logreg_under.predict(X_test)

# Calculate ROC curve and AUC for undersampled model
fpr_under, tpr_under, _ = roc_curve(y_test, y_pred_under)
roc_auc_under = auc(fpr_under, tpr_under)

accuracy_over = accuracy_score(y_test, y_pred_over)
accuracy_under = accuracy_score(y_test, y_pred_under)

print("Accuracy with oversampling:", accuracy_over)
print("Accuracy with undersampling:", accuracy_under)

from sklearn.metrics import roc_curve, auc

fpr_over, tpr_over, _ = roc_curve(y_test, y_pred_over)
roc_auc_over = auc(fpr_over, tpr_over)

# Compute ROC curve and AUC for undersampled model

fpr_under, tpr_under, _ = roc_curve(y_test, y_pred_under)
roc_auc_under = auc(fpr_under, tpr_under)

# Plot ROC curves and display AUC for both models

plt.figure(figsize=(8, 6))
plt.plot(fpr_over, tpr_over, color='darkorange', lw=2, label=f'Oversampled (AUC = {roc_auc_over:.2f})')
plt.plot(fpr_under, tpr_under, color='blue', lw=2, label=f'Undersampled (AUC = {roc_auc_under:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic')
plt.legend(loc='lower right')
plt.show()

"""Choosing the right Algorithmn mechanism"""

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, roc_auc_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix
from imblearn.over_sampling import RandomOverSampler
from imblearn.under_sampling import RandomUnderSampler
import matplotlib.pyplot as plt
import seaborn as sns

# Oversampling
oversampler = RandomOverSampler(random_state=42)
X_train_over, y_train_over = oversampler.fit_resample(X_train, y_train)

# Logistic Regression with Oversampling
logreg_over = LogisticRegression(random_state=42)
logreg_over.fit(X_train_over, y_train_over)
y_pred_over = logreg_over.predict(X_test)

# Metrics for Oversampling
accuracy_over = accuracy_score(y_test, y_pred_over)
auc_over = roc_auc_score(y_test, y_pred_over)
precision_over = precision_score(y_test, y_pred_over)
recall_over = recall_score(y_test, y_pred_over)
f1_over = f1_score(y_test, y_pred_over)

print("Oversampling Metrics:")
print(f"Accuracy: {accuracy_over}")
print(f"AUC: {auc_over}")
print(f"Precision: {precision_over}")
print(f"Recall: {recall_over}")
print(f"F1 Score: {f1_over}")

# Undersampling
undersampler = RandomUnderSampler(random_state=42)
X_train_under, y_train_under = undersampler.fit_resample(X_train, y_train)

# Logistic Regression with Undersampling
logreg_under = LogisticRegression(random_state=42)
logreg_under.fit(X_train_under, y_train_under)
y_pred_under = logreg_under.predict(X_test)

# Metrics for Undersampling
accuracy_under = accuracy_score(y_test, y_pred_under)
auc_under = roc_auc_score(y_test, y_pred_under)
precision_under = precision_score(y_test, y_pred_under)
recall_under = recall_score(y_test, y_pred_under)
f1_under = f1_score(y_test, y_pred_under)

print("Undersampling Metrics:")
print(f"Accuracy: {accuracy_under}")
print(f"AUC: {auc_under}")
print(f"Precision: {precision_under}")
print(f"Recall: {recall_under}")
print(f"F1 Score: {f1_under}")

# Confusion Matrix and Classification Report for both models
def plot_confusion_matrix_and_report(y_test, y_pred, title):
    cm = confusion_matrix(y_test, y_pred)
    report = classification_report(y_test, y_pred)

    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, cmap='Blues', fmt='g')
    plt.xlabel('Predicted Classes')
    plt.ylabel('Actual Classes')
    plt.title(f'Confusion Matrix - {title}')
    plt.show()

    print(f'Classification Report - {title}:\n{report}')

plot_confusion_matrix_and_report(y_test, y_pred_over, 'Oversampling')
plot_confusion_matrix_and_report(y_test, y_pred_under, 'Undersampling')

# Plot ROC Curves
from sklearn.metrics import roc_curve, auc

fpr_over, tpr_over, _ = roc_curve(y_test, y_pred_over)
fpr_under, tpr_under, _ = roc_curve(y_test, y_pred_under)

plt.figure(figsize=(8, 6))
plt.plot(fpr_over, tpr_over, color='darkorange', lw=2, label=f'Oversampled (AUC = {auc_over:.2f})')
plt.plot(fpr_under, tpr_under, color='blue', lw=2, label=f'Undersampled (AUC = {auc_under:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic')
plt.legend(loc='lower right')
plt.show()

# dump (logreg_smote,'./Backend/mlModels/thunderPredictionModel.joblib')