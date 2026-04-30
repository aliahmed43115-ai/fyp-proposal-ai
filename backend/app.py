from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route('/api/generate', methods=['POST'])
def generate_proposal():
    data = request.json
    brief = data.get('brief', '')
    platform = data.get('platform', 'Upwork')
    budget = data.get('budget', '')

    prompt = f"""You are an expert freelance proposal writer.

Write a professional, personalized proposal for this project:

Platform: {platform}
Client Brief: {brief}
Budget: {budget}

Write a winning proposal with:
1. Strong opening hook
2. Understanding of the project
3. Your approach and solution
4. Why you are the best fit
5. Call to action

Keep it professional, confident and under 400 words."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({"proposal": response.choices[0].message.content})

@app.route('/')
def home():
    return jsonify({"status": "ProposalAI Backend Running!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)