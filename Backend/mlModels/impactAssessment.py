from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score,precision_score, recall_score, f1_score
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import numpy as np
import requests
import statsmodels.api as sm
from sklearn.model_selection import  RandomizedSearchCV
from joblib import dump
from sklearn.metrics import roc_curve, roc_auc_score, auc
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix
import seaborn as sns
# Read csv file 
df = pd.read_csv('./Backend/datasets/AllFloodDamagesRepeat - ratnapura.csv')
df.rename(columns={'Temp_Max.1':'Temp_Min','Date (YMD)':'Date'}, inplace=True)

# columns_to_drop = ['Serial','Province','Code Province','Code District','District','Code Division','Division','Date','OldAffected_Count']
columns_to_drop = ['Serial','Province','Code Province','Code District','District','Code Division','Division','Date','Unnamed: 14','Unnamed: 17','Risk','Event','Area']
df = df.drop(columns=columns_to_drop)

df['Temp_avg'] = (df['Temp_Max'] + df['Temp_Min']) / 2
df['Temp_avg'] = df['Temp_avg'].round(1)
correlation_matrix = df.corr()
print(correlation_matrix)

# List of row indexes where you want to set values to zero
indexes_to_set_zero = [50, 58, 70]

# Set the values at the specified indexes to zero
df.loc[indexes_to_set_zero, 'Damaged_houses'] = 0

quartile_labels = pd.qcut(df['Affected_Count'], q=4, labels=False)

# Group the data by quartile labels and calculate statistics
quartile_stats = df.groupby(quartile_labels).agg({'Affected_Count': ['count', 'min', 'max']})

# Rename the columns for clarity
quartile_stats.columns = ['Count', 'QuartileMin', 'QuartileMax']

# Print the quartile statistics
print(quartile_stats)

#function to categorize the levels 
def categorize_value(value):

    if value <= 335:
        no = 0
        return no
    elif value <= 3003:
        no = 1
        return no
    elif value <= 14649:
        no = 2
        return no
    else:
        no= 3
        return no



# Apply nested if-else categorization using the defined function
df['Affected_Range'] = df['Affected_Count'].apply(categorize_value)

# Get the counts that fall under each condition
count_per_category = df['Affected_Range'].value_counts().sort_index()

# Display the counts for each category
print(count_per_category)

X = df[['Rainfall_avg','Temp_avg']]
y = df['Affected_Range']



# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model =SVC()

# Train the model on the training data
model.fit(X_train, y_train)

# Make predictions on the testing data
arr = [57,	30.5	,30.7]
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
# Define the hyperparameter distribution for tuning (use a range or a list of values)
param_distributions = {
    'C': [0.01, 0.1, 1, 10, 100],            # Regularization parameter
    'kernel': ['linear', 'rbf', 'poly']      # Kernel choice: linear, radial basis function (RBF), polynomial
}

# Create the Support Vector Machine classifier
svc_classifier = SVC(random_state=42)

# Create Randomized Search object and fit it to the data
random_search = RandomizedSearchCV(estimator=svc_classifier, param_distributions=param_distributions, n_iter=10, cv=5, random_state=42)
random_search.fit(X_train, y_train)

# Get the best hyperparameters from the randomized search
best_params = random_search.best_params_

# Train the model with the best hyperparameters
optimizedModel = SVC(random_state=42, **best_params)
optimizedModel.fit(X_train, y_train)
y_score = optimizedModel.decision_function(X_test)
print(df.head)
# Make predictions on the test set
arr = [12,45.0]
y_predop = optimizedModel.predict(X_test)
print(y_predop)
correlation_matrix = df.corr()
print(correlation_matrix)
confusion_mat = confusion_matrix(y_test, y_predop)
# y_predop = optimizedModel.predict([arr])
#Calculate accuracy on the test set

n_classes = len(np.unique(y_train))

fpr = dict()
tpr = dict()
roc_auc = dict()

for i in range(n_classes):
    fpr[i], tpr[i], _ = roc_curve(y_test == i, y_score[:, i])
    roc_auc[i] = auc(fpr[i], tpr[i])
accuracy = accuracy_score(y_test, y_predop)
# Calculate precision
precision = precision_score(y_test, y_predop, average='weighted')  # You can use 'micro', 'macro', 'weighted', or None
print("Precision:", precision)

# Calculate recall
recall = recall_score(y_test, y_predop, average='weighted')  # You can use 'micro', 'macro', 'weighted', or None
print("Recall:", recall)

# Calculate F1-score
f1 = f1_score(y_test, y_predop, average='weighted')  # You can use 'micro', 'macro', 'weighted', or None
print("F1-score:", f1)
plt.figure(figsize=(10, 6))

for i in range(n_classes):
    plt.plot(fpr[i], tpr[i], lw=2, label='Class %d (AUC = %0.2f)' % (i, roc_auc[i]))

plt.plot([0, 1], [0, 1], linestyle='--', color='gray', lw=2)
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic')
plt.legend(loc='lower right')
plt.show()
print("Accuracy with Randomized Search:", accuracy)

# Get the best hyperparameters
print("Best Hyperparameters:", best_params)
plt.figure(figsize=(8, 6))
sns.heatmap(confusion_mat, annot=True, fmt="d", cmap="Blues", 
xticklabels=sorted(np.unique(y_test)), yticklabels=sorted(np.unique(y_test)))
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()

# dump (optimizedModel,'./Backend/mlModels/impactAssessment.joblib')