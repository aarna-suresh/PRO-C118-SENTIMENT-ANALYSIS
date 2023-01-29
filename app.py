from flask import Flask, render_template, request, jsonify
from model_prediction import *

app = Flask(__name__)

text = ""
predicted_emotion = ""
predicted_emotion_img_url = ""

# render HTML page


@app.route("/")
def home():
    entries = show_entry()
    return render_template("index.html", entries=entries)

# predict emotion


@app.route("/predict-emotion", methods=["POST"])
def predict_emotion():
    input_text = request.json.get("text")
    if not input_text:
        return jsonify({
            "status": "error",
            "message": "Please enter some text to predict emotion!"
        }), 400
    else:
        predicted_emotion, predicted_emotion_img_url = predict(input_text)
        return jsonify({
            "data": {
                "predicted_emotion": predicted_emotion,
                "predicted_emotion_img_url": predicted_emotion_img_url
            },
            "status": "success"
        }), 200
#    Open app.py for writing the API.
# 1. Use the route function for redirecting the Flask to save the entry.
# 2. Inside the API we’ll be first saving the data (date, text and emotions) in different
#    variables.
# 3. All the entries are stored in a comma-separated manner using the variable entry.
# 4. The file_handler variable is used to open the CSV file for saving the entry,
# 5. The open() method is used to open the CSV file. ‘a’ stands for the append method so that
#    data can be appended in the file using the write() method.
# 6. The entries are then appended and saved in the file.
# 7. On success, the data is sent in JSON format
#    Save entry


@app.route("/save-entry", methods=["POST"])
def save_entry():

    # Get Date, Predicted Emotion & Text Enter by the user to save the entry
    date = request.json.get("date")
    emotion = request.json.get("emotion")
    save_text = request.json.get("text")

    save_text = save_text.replace("\n", " ")

    # CSV Entry
    entry = f'"{date}","{save_text}","{emotion}"\n'

    with open("./static/assets/data_files/data_entry.csv", "a") as f:
        f.write(entry)
    return jsonify("Success")


if __name__ == "__main__":
    app.run(debug=True)
