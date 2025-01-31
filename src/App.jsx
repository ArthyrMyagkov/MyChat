import { useState } from 'react'
import ChatBox from './components/Chatbox.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatBox/>

    </>
  )
}

export default App
