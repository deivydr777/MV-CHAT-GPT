let chatBox = document.getElementById("chat-box");

function appendMessage(message, fromUser) {
    let div = document.createElement("div");
    div.classList.add(fromUser ? "user-msg" : "bot-msg");
    div.textContent = message;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim()) {
        appendMessage(userInput, true);
        document.getElementById("user-input").value = "";
        fetch("http://localhost:5000/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage(data.reply, false);
        });
    }
}