import { useEffect, useState } from "react";
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000', { transports: ['websocket'] }); // Connect to the Socket.io server

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('chat message', message);
            setMessage('');
        }
    };

    return (
        <div className="App">
            <div className="chat-box">
                <ul id="messages">
                    {messages.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                    ))}
                </ul>
                <form onSubmit={sendMessage}>
                    <input
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        autoComplete="off"
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;