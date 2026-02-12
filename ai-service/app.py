from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from models.image_classifier import ImageClassifier
from models.text_classifier import TextClassifier

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize models
print("🤖 Initializing AI models...")
image_classifier = ImageClassifier()
text_classifier = TextClassifier()
print("✅ AI models loaded successfully")

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'message': 'AI Service is running',
        'models': {
            'image_classifier': 'loaded',
            'text_classifier': 'loaded'
        }
    })

@app.route('/classify/image', methods=['POST'])
def classify_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        image_file = request.files['image']
        
        if image_file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400
        
        # Classify the image
        result = image_classifier.classify(image_file)
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Error classifying image: {str(e)}")
        return jsonify({
            'error': 'Failed to classify image',
            'message': str(e)
        }), 500

@app.route('/classify/text', methods=['POST'])
def classify_text():
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        text = data['text']
        
        if not text or not isinstance(text, str) or len(text.strip()) == 0:
            return jsonify({'error': 'Invalid text input'}), 400
        
        # Classify the text
        result = text_classifier.classify(text)
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Error classifying text: {str(e)}")
        return jsonify({
            'error': 'Failed to classify text',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 8000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f"🚀 Starting AI Service on port {port}")
    print(f"📊 Debug mode: {debug}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
