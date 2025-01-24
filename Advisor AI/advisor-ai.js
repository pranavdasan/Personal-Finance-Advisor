const { OpenAI } = require('openai');
require('dotenv').config();


const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

// OpenAI API setup
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use an environment variable for security
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

    try {
        const completion = await openai.ChatCompletion.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful financial assistant." },
                { role: "user", content: message },
            ],
        });

        addMessage(completion.choices[0].message.content, "bot");
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        addMessage("Sorry, there was an error. Please try again later.", "bot");
    }
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
