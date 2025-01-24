
import OpenAI from "openai";

const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

// OpenAI API setup
const openai = new OpenAI({
    apiKey: 'sk-proj-5WewHGIETsuzEiEfsi6uYV5qOmRDWiRbviE0rtTr6ZV1pj-U4ej4IUuHEaAIuHlTU2i_qbBYOWT3BlbkFJhF',
  });


// Function to append messages to the chat window
function addMessage(message, sender = 'user') {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Function to send a message to the AI
async function sendMessage(message) {
    addMessage(message, 'user');

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "developer", content: "You are a helpful financial assistant." },
            {
                role: "user",
                content: message,
            },
        ],
        store: true,
    });

    addMessage(completion.choices[0].message, "bot");
}

// Event listener for the chat form
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value;
    if (message.trim() !== '') {
        sendMessage(message);
        userInput.value = '';
    }
});
