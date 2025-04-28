from flask import Flask, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = 'SUA_API_KEY_AQUI'  # Substitua pela sua chave OpenRouter

@app.route('/message', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')

    response = openai.Completion.create(
        engine="mistral-7b",  # Ou outro modelo disponível
        prompt=user_message,
        max_tokens=150
    )

    return jsonify({"reply": response.choices[0].text.strip()})

if __name__ == "__main__":
    app.run(debug=True)