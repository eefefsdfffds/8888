document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage('用户', userInput);
    document.getElementById('user-input').value = '';

    // 调用智普清言API
    fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 3e07fb6c82ea91a07b7e90a39798d419.UqmcgHC0QJLkvOYC' // 使用您的API密钥
        },
        body: JSON.stringify({
            model: "glm-4",
            messages: [
                {
                    role: "user",
                    content: userInput
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.choices && data.choices.length > 0) {
            appendMessage('AI', data.choices[0].message.content);
        } else {
            appendMessage('AI', '抱歉，我无法处理您的请求。');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('AI', '抱歉，我无法处理您的请求。');
    });
}

function appendMessage(sender, message) {
    const chatOutput = document.getElementById('chat-output');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}