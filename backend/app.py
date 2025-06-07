from flask import Flask, send_from_directory
from flask_cors import CORS
from db import db
import os
from db_config import Config

# Blueprints
from routes.floor_routes import floor_bp
from routes.room_routes import room_bp
from routes.bed_routes import bed_bp
from routes.student_routes import student_bp

app = Flask(__name__)
CORS(app) 
app.config.from_object(Config)

# Enable CORS globally
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')
@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

# Initialize DB
db.init_app(app)

# Register blueprints
app.register_blueprint(floor_bp)
app.register_blueprint(room_bp)
app.register_blueprint(bed_bp)
# app.register_blueprint(student_bp)
app.register_blueprint(student_bp, url_prefix='/api')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
