import { useState } from "react";

const MessageInput = () => {
  const [text, setText] = useState('');

  return (
    <div className="flex mt-2">
      <textarea
        className="border border-black rounded max-h-36"
        maxLength={2000}
        cols={50}
        rows={1}
        wrap="soft"
        placeholder="Type here..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button 
        className="border border-black rounded bg-blue-300 ml-2"
      >
        Send
      </button>
    </div>
  )
}

export default MessageInput;