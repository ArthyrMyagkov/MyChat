import arrow from '../assets/arrow.svg';
import { useState } from 'react';
import Emoji from './Emoji';

function ChatBox(){

    const [typing, setTyping] = useState(false);

    const [messages, setMessages] = useState([
        {user: 'User1', text: 'Hi! How are you?', time: '23:35',reaction: ''},
        {user: 'User2', text: 'I am fine! How are you?', time: '23:35',reaction: '😊'},
        {user: 'User1', text: 'I am fine too. What are you doing?', time: '23:35',reaction: ''},
        {user: 'User2', text: 'Nothing special. Playing Cyberpunk 2077. And you?', time: '23:36',reaction: ''},
        {user: 'User1', text: 'Just watching Netflix. I am bored.', time: '23:37',reaction: ''},
    ]);

    const emojiList = ["😊", "😂", "😍", "😎", "👍", "🔥", "❤️", "😭","🖕","🤬"];

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
            setMessages([...messages, newMessage]);
            input.value = '';
            setTyping(false);
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