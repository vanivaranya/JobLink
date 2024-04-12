from flask import Flask, jsonify, request
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize


# NLP techniques
stop_words = set(stopwords.words('english'))

app = Flask(__name__)
CORS(app)

# Load the pre-trained components
logistic_regression_model = joblib.load('C:/Users/vaniv\OneDrive\Desktop\coding\joblink (2)/joblink/src/components/mymodel/model.pkl')
label_encoder_category = joblib.load('C:/Users/vaniv/OneDrive/Desktop/coding/joblink (2)/joblink/src/components/mymodel/label_encoder.pkl')
tfidf_vectorizer = joblib.load('C:/Users/vaniv/OneDrive/Desktop/coding/joblink (2)/joblink/src/components/mymodel/tfidf_vectorizer.pkl')

# Route for predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get user input from the request
        user_input = request.json['user_input']

        # Preprocess user input
        user_input_preprocessed = preprocess_text(user_input)

        # Transform user input using the pre-trained TF-IDF vectorizer
        user_input_tfidf = tfidf_vectorizer.transform([user_input_preprocessed])

        # Predict category using the pre-trained Logistic Regression model
        predicted_category = logistic_regression_model.predict(user_input_tfidf)[0]

        # Convert the predicted category label using the pre-trained label encoder
        predicted_category_label = label_encoder_category.inverse_transform([predicted_category])[0]

        return jsonify({'predicted_category_label': predicted_category_label, 'error': None})

    except Exception as e:
        return jsonify({'predicted_category_label': None, 'error': str(e)})

def preprocess_text(text):
    # Tokenization
    tokens = word_tokenize(text)

    # Remove stopwords, lowercase, and concatenate back to text
    filtered_tokens = [token.lower() for token in tokens if token.isalnum() and token.lower() not in stop_words]
    preprocessed_text = ' '.join(filtered_tokens)

    return preprocessed_text

if __name__ == '__main__':
    app.run(debug=True)
    
# cd C:\Users\hp\Desktop\ReactProject\joblink\src\components\mymodel
# python app.py

