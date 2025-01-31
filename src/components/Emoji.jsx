function Emoji(){
    const emojiList = ["😊", "😂", "😍", "😎", "👍", "🔥", "❤️", "😭","🖕","🤬"];

    function addEmoji(emoji){
        const input = document.querySelector('.Chatbox-input input');
        input.value += emoji;
    }

    return (
        <div className="Emoji">
            <h2><div className="Emoji-List">{emojiList.map((emoji,index)=>{return <span className="EmojiSymbol" onClick={()=>addEmoji(emoji)} key={index}>{emoji}</span> })}</div>😊</h2>

        </div>
    )

}


export default Emoji;