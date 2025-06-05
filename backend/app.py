from flask import Flask, send_from_directory
import os
from flask_cors import CORS
from db import db
from db_config import Config
from routes.student_routes import student_bp
from routes.infra_routes import infra_bp  
from routes.floor_routes import floor_bp

# Step 1: Initialize Flask
app = Flask(__name__)
app.config.from_object(Config)

# Step 2: CORS setup
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Step 3: Uploads
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
@app.route('/uploads/<path:filename>')
def serve_uploads(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# Step 4: DB setup
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# print("SQLALCHEMY_DATABASE_URI =>", app.config["SQLALCHEMY_DATABASE_URI"])
db.init_app(app)


# Step 6: Register blueprints
app.register_blueprint(student_bp) 
app.register_blueprint(infra_bp)
app.register_blueprint(floor_bp)


@app.route("/")
def index():
    return "Server is running"

# Optional: create tables directly (for testing only — use migrations in production)
# with app.app_context():
#     db.create_all()

# Step 7: Run server
if __name__ == "__main__":
    app.run(debug=True)
