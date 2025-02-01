import arrow from '../assets/arrow.svg';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Emoji from './Emoji';
const socket = io('http://localhost:4000');

function ChatBox(){

    const [typing, setTyping] = useState(false);


    const [messages, setMessages] = useState([]);

    const emojiList = ["😊", "😂", "😍", "😎", "👍", "🔥", "❤️", "😭","🖕","🤬"];

    useEffect(() => {
        // Load initial messages
        const handleInitialMessages = (initialMessages) => {
          setMessages(initialMessages);
        };
      
        const handleNewMessage = (newMessage) => {
          setMessages((prev) => [...prev, newMessage]);
        };
      
        socket.on('initialMessages', handleInitialMessages);
        socket.on('receiveMessage', handleNewMessage);
      
        return () => {
          socket.off('initialMessages', handleInitialMessages);
          socket.off('receiveMessage', handleNewMessage);
        };

      }, []);

    function handleInputChange(e) {
        setTyping(e.target.value.length > 0);
        const chatbox = document.querySelector('.Chatbox');
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function addMessage(){
        const input = document.querySelector('.Chatbox-input input');
        const message = input.value;
        const chatbox = document.querySelector('.Chatbox');
        console.log(message);
        if(message.length > 0){
            const newMessage = {user: 'User1', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })};
            input.value = '';
            setTyping(false);
            console.log(messages);
            socket.emit('sendMessage', newMessage);
        }
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function handleKeyDown(e){
        if(e.key === 'Enter'){
            addMessage();
        }
    }

    return(
        <div className="Chatbox-container">
            <h2>🌐 International ChatBox 🌐</h2>
            <div className="Chatbox">
                {messages.map((message,index)=>{
                    return <div id={index} key={index} className={"Message "+message.user}><p>{message.text}</p><h5 className='Time'>{message.time}</h5><h2 className='message-reaction'>{message.reaction}</h2><h3><div className="Reaction">{emojiList.map((emoji,id)=>{return <span onClick={() => setMessages((prevMessages) => prevMessages.map((msg, msgIndex) => msgIndex === index ? { ...msg, reaction: emoji } : msg) )} className="Reaction-emoji" key={id}>{emoji}</span>})}</div></h3></div>
                })}
                {typing && <h3 className='Message Typing User2'>Writing... ✍️</h3>}
            </div>
            <div className="Chatbox-input">
                <input onKeyDown={handleKeyDown} onInput={handleInputChange} type="text" placeholder="Type your message here..." />
                <Emoji />
                <button onClick={addMessage}><img src={arrow} alt="arrow" /></button>
            </div>

        </div>
    )
}

export default ChatBox;