from flask import Flask, send_from_directory
import os
from flask_cors import CORS
from db import db
from db_config import Config
from routes.student_routes import student_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')

@app.route('/uploads/<path:filename>')
def serve_uploads(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# Load DB config, etc.
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://<user>:<password>@<dsn-name>'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

print("SQLALCHEMY_DATABASE_URI =>", app.config["SQLALCHEMY_DATABASE_URI"])


db.init_app(app)

app.register_blueprint(student_bp)

@app.route("/")
def index():
    return "Server is running"

if __name__ == "__main__":
    app.run(debug=True)
