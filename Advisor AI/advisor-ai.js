document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');

    const API_KEY = 'API_KEY_HERE';

    // Function to append messages to the chat window
    function addMessage(message, sender = 'user') {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageDiv.textContent = message;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Function to send a message to the OpenAI API
    async function sendMessage(message) {
        addMessage(message, 'user');

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo", // Specify your model here
                    messages: [
                        { role: "system", content: "You are a helpful financial assistant." },
                        { role: "user", content: message },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            addMessage(data.choices[0].message.content, 'bot');
        } catch (error) {
            console.error('Error communicating with OpenAI:', error);
            addMessage("Sorry, there was an error. Please try again later.", 'bot');
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
});
