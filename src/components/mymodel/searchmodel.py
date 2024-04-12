# pip install pandas numpy scikit-learn nltk 

import pandas as pd
from flask import jsonify
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
# from sklearn.externals import joblib
import joblib
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
nltk.download('punkt')
nltk.download('stopwords')

# NLP techniques
stop_words = set(stopwords.words('english'))

file_path = 'C:/Users/vaniv/OneDrive/Desktop/coding/joblink (2)/joblink/src/components/mymodel/Task Dataset.csv'
df = pd.read_csv(file_path)

# Drop unnecessary columns
df.drop("CommentNo", axis=1, inplace=True)

# Shuffle and reset index
df = df.sample(frac=1).reset_index(drop=True)

# Label encoding
label_encoder_category = LabelEncoder()
df['category_label'] = label_encoder_category.fit_transform(df['Category'])

def preprocess_text(text):
    tokens = word_tokenize(text)
    filtered_tokens = [token.lower() for token in tokens if token.isalnum() and token.lower() not in stop_words]
    preprocessed_text = ' '.join(filtered_tokens)
    return preprocessed_text

df['comments_preprocessed'] = df['Comment'].apply(preprocess_text)

# TF-IDF transformation
tfidf_vectorizer = TfidfVectorizer()
X_tfidf = tfidf_vectorizer.fit_transform(df['comments_preprocessed'])
y_category_labels = df['category_label']

# Logistic Regression model
logistic_regression_model = LogisticRegression()
logistic_regression_model.fit(X_tfidf, y_category_labels)

# Save the trained components to .pkl files
joblib.dump(logistic_regression_model, 'C:/Users/vaniv\OneDrive\Desktop\coding\joblink (2)/joblink/src/components/mymodel/model.pkl')
joblib.dump(label_encoder_category, 'C:/Users/vaniv/OneDrive/Desktop/coding/joblink (2)/joblink/src/components/mymodel/label_encoder.pkl')
joblib.dump(tfidf_vectorizer, 'C:/Users/vaniv/OneDrive/Desktop/coding/joblink (2)/joblink/src/components/mymodel/tfidf_vectorizer.pkl')

