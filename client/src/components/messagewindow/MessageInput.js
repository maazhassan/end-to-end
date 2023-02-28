import { useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const MessageInput = props => {
  const [text, setText] = useState('');

  const textAreaRef = useRef(null);

  const { sendJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    share: true,
    filter: m => {
      return false;
    }
  });

  const sendMessage = () => {
    sendJsonMessage({type: "message", from: props.name, to: props.selected, message: text});
    setText('');
    textAreaRef.current.focus();
  }

  return (
    <div className={`flex flex-row mt-2 ${props.selected ? '' : 'pointer-events-none'}`}>
      <textarea
        className="border border-black focus:bg-gray-100 focus:outline-none rounded max-h-36"
        maxLength={2000}
        cols={50}
        rows={1}
        wrap="soft"
        placeholder="Type here..."
        value={text}
        onChange={e => setText(e.target.value)}
        ref={textAreaRef}
      />
      <button 
        className="border border-black rounded bg-blue-300 ml-2 disabled:bg-gray-300 grow self-start"
        onClick={() => sendMessage()}
        disabled={text.length === 0}
      >
        Send
      </button>
    </div>
  )
}

export default MessageInput;