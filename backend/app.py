from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load models
with open("model.pkl", "rb") as f:
    placement_model = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

with open("lr2.pkl", "rb") as f:
    exam_model = pickle.load(f)


@app.route("/")
def home():
    return "Placement Predictor API is running."


# ---------------- Placement Predictor ---------------- #

@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        cgpa = float(data["cgpa"])
        iq = float(data["iq"])

        features = np.array([[cgpa, iq]])

        scaled = scaler.transform(features)

        prediction = placement_model.predict(scaled)

        result = "Placed" if prediction[0] == 1 else "Not Placed"

        return jsonify({
            "prediction": result
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


# ---------------- Exam Predictor ---------------- #

@app.route("/predict2", methods=["POST"])
def predict2():

    try:
        data = request.get_json()

        yes_no = {
            "yes": 1,
            "no": 0
        }

        features = np.array([[
            float(data["study"]),
            float(data["attendance"]),
            float(data["mental"]),
            float(data["sleep"]),
            yes_no[data["parttime"].lower()]
        ]])

        prediction = exam_model.predict(features)[0]

        prediction = max(0, min(100, float(prediction)))

        return jsonify({
            "prediction": round(prediction, 2)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


if __name__ == "__main__":
    app.run(debug=True)