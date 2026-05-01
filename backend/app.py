from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from groq import Groq
import PyPDF2
import docx
import io

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file):
    doc = docx.Document(io.BytesIO(file.read()))
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

@app.route('/api/generate', methods=['POST'])
def generate_proposal():
    brief = request.form.get('brief', '')
    platform = request.form.get('platform', 'Upwork')
    budget = request.form.get('budget', '')

    if 'file' in request.files:
        file = request.files['file']
        filename = file.filename.lower()
        if filename.endswith('.pdf'):
            brief = extract_text_from_pdf(file)
        elif filename.endswith('.docx'):
            brief = extract_text_from_docx(file)

    prompt = f"""You are a world-class freelance proposal writer who has helped freelancers win over $10 million in contracts on {platform}.

Write a highly personalized, compelling, and professional proposal for this project.

Platform: {platform}
Client Brief: {brief}
Freelancer Budget: {budget}

FORMAT THE PROPOSAL EXACTLY LIKE THIS:

🎯 SUBJECT: [Write a catchy, specific project title]

---

Dear Hiring Manager,

[Write a powerful 2-3 sentence opening hook that immediately grabs attention.]

---

✅ UNDERSTANDING YOUR PROJECT

[Write 2-3 sentences showing deep understanding of their exact needs.]

---

🚀 MY APPROACH & SOLUTION

[Write a clear 3-4 step action plan with specific tools and methods.]

---

⭐ WHY CHOOSE ME

[Write 3 specific bullet points about relevant experience.]

---

📅 TIMELINE & INVESTMENT

Timeline: [Realistic timeline]
Investment: [Price based on budget]
Includes: [3-4 key deliverables]

---

💬 NEXT STEPS

[Write a confident 2-sentence call to action.]

Keep it professional, specific, and human. Never generic."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({"proposal": response.choices[0].message.content})

@app.route('/api/pricing', methods=['POST'])
def generate_pricing():
    data = request.json
    brief = data.get('brief', '')
    platform = data.get('platform', 'Upwork')
    budget = data.get('budget', '')
    skills = data.get('skills', '')

    prompt = f"""You are an expert freelance pricing consultant with 10+ years experience on {platform}.

Analyze this project and suggest the best pricing strategy:

Platform: {platform}
Project Brief: {brief}
Client Budget: {budget}
Freelancer Skills: {skills}

Respond in this EXACT format:

💰 PRICING ANALYSIS

---

📊 MARKET RATE
Entry Level: $[amount]
Mid Level: $[amount]
Expert Level: $[amount]

---

🎯 RECOMMENDED PRICE FOR YOU
Fixed Price: $[amount]
Hourly Rate: $[amount]/hr

---

📋 PRICE BREAKDOWN
[Break down exactly what is included and why this price is justified. List 4-5 specific deliverables with individual costs]

---

⚡ PRICING STRATEGY
[Give 3 specific tips on how to present this price to win the client. Be specific to {platform}]

---

⚠️ RED FLAGS
[Mention any budget concerns or red flags based on client's stated budget vs project complexity]

Keep it specific, data-driven and actionable."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({"pricing": response.choices[0].message.content})

@app.route('/')
def home():
    return jsonify({"status": "ProposalAI Backend Running!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)