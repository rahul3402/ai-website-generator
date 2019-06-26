from flask import Flask, render_template, request, Response, jsonify

from old_reference_master_donotedit_section_4_fakenews import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['GET'])
def predict():
  input_text = request.args.get('input')
  print(input_text) 

  def complete_model_fn(input_text):
  	url, html = get_data_pair(input_text)

  	curr_X = featurize_data_pair(url, html)

  	model = train_model(combined_train_X, train_y, combined_val_X, val_y)

  	curr_y = model.predict(curr_X)[0]

  	if curr_y < .5:
  		prediction = 'Real'
  	else:
  		prediction = 'Fake'

  	return prediction


  prediction = complete_model_fn(input_text)
  
  response = {'input': input_text, 'prediction': prediction}

  return jsonify(response)

