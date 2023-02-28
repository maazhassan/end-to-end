import { useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const MessageInput = props => {
  const [text, setText] = useState('');

  const { sendJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    share: true,
    filter: m => {
      return false;
    }
  });

  const sendMessage = () => {
    sendJsonMessage({type: "message", from: props.name, to: props.selected, message: text});
    setText('');
  }

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
        className={`border border-black rounded bg-blue-300 ml-2 disabled:bg-gray-300`}
        onClick={() => sendMessage()}
        disabled={text.length === 0}
      >
        Send
      </button>
    </div>
  )
}

export default MessageInput;