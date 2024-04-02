import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import statsmodels.api as sm
import requests
from statsmodels.tsa.stattools import adfuller
from sklearn.metrics import accuracy_score
import seaborn as sns
from imblearn.over_sampling import RandomOverSampler
from imblearn.under_sampling import RandomUnderSampler
from joblib import dump

# Read Excel file
df = pd.read_csv('./datasets/Thunder_Rathnapura.csv')
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
df['Thunderstrom '] = df['Thunderstrom '].replace({'YES': 1, 'NO': 0})

# Check unique values
unique_values_thunder = df['Thunderstrom '].unique()
print(unique_values_thunder)
unique_values = df['Temp_Min'].unique()
unique_values = df['Temp_Max'].unique()
unique_values_rain = df['Rainfall_avg'].unique()
print(unique_values_rain)

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

grouped_data = df.groupby('row_number').agg({'Rainfall_avg': 'mean'})

# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_avg'))

grouped_data = df.groupby('row_number').agg({'Temp_Max': 'mean'})

# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_avg'))

grouped_data = df.groupby('row_number').agg({'Temp_Min': 'mean'})

# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_avg'))

grouped_data = df.groupby('row_number').agg({'Thunderstrom ': 'max'})

# Merge the grouped data with the original DataFrame
df = df.merge(grouped_data, left_on='row_number', right_index=True, suffixes=('', '_max'))

# Drop columns that are no longer needed
columns_to_drop = ['Rainfall_avg', 'Temp_Max','Temp_Min','Thunderstrom ','Day','RATNAPURA','Year','Month']
df = df.drop(columns_to_drop, axis=1)
df = df.drop_duplicates(subset=['row_number'])

#Split data into training and test data sets
X_train, X_test, y_train, y_test = train_test_split(df.drop('Thunderstrom _max', axis=1), df['Thunderstrom _max'], test_size=0.2, stratify=df['Thunderstrom _max'], random_state=42)

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

# Create the RandomForestClassifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the classifier on the training data
clf.fit(X_train, y_train)

# Create an instance of the RandomForestClassifier model
model = RandomForestClassifier()

# Fit the model to the training data
model.fit(X_train, y_train)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

oversampler = RandomOverSampler(random_state=42)
X_train_over, y_train_over = oversampler.fit_resample(X_train, y_train)

# Undersampling using RandomUnderSampler
undersampler = RandomUnderSampler(random_state=42)
X_train_under, y_train_under = undersampler.fit_resample(X_train, y_train)

# Create and train logistic regression models on resampled data
model_over = RandomForestClassifier(random_state=42)
model_over.fit(X_train_over, y_train_over)
y_pred_over = model_over.predict(X_test)

model_under = RandomForestClassifier(random_state=42)
model_under.fit(X_train_under, y_train_under)
y_pred_under = model_under.predict(X_test)

# Calculate and print accuracy for oversampled and undersampled models
accuracy_over = accuracy_score(y_test, y_pred_over)
accuracy_under = accuracy_score(y_test, y_pred_under)

print("Accuracy with oversampling:", accuracy_over)
print("Accuracy with undersampling:", accuracy_under)

dump (model_under,'./Backend/mlModels/thunderModel.joblib')