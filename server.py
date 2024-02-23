import pandas as pd
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def full_table():
    titanic = pd.read_csv('titanic.csv')
    result = titanic
    return result.to_json(orient='table')

@app.route('/', methods=['POST'])
def result_table():
    titanic = pd.read_csv('titanic.csv')
    data = request.get_json()
    try:
        min_age = int(data.get('minAge'))
        max_age = int(data.get('maxAge'))
        if min_age > max_age:
            raise ValueError('minAge cannot be greater than maxAge')
        result = titanic[(titanic['Age'] >= int(min_age)) & (titanic['Age'] <= int(max_age))].sort_values(by='Age')
        return result.to_json(orient='table')
    except ValueError as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run()