
function Reaction(){
     const emojiList = ["😊", "😂", "😍", "😎", "👍", "🔥", "❤️", "😭","🖕","🤬"];

     return (
        <div>
            <h3><div className="Reaction">{emojiList.map((emoji,index)=>{return <span className="Reaction-emoji" key={index}>{emoji}</span>})}</div></h3>
        </div>
     )
}

export default Reaction;