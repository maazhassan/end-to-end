import { useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { AES, enc } from "crypto-js";

const MessageInput = props => {
  const [text, setText] = useState('');

  const textAreaRef = useRef(null);
  const firstMessageRef = useRef(false);

  const { sendJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    share: true,
    filter: m => {
      return false;
    }
  });

  const sendMessage = () => {
    if (text.length !== 0) {
      const encrypted = AES.encrypt(text, props.aesKey, { iv: props.iv });
      const cipherText = encrypted.ciphertext.toString(enc.Base64);

      if (!firstMessageRef.current) {
        props.setFirstMessage(cipherText);
        firstMessageRef.current = true;
      }

      sendJsonMessage({type: "message", from: props.name, to: props.selected, message: cipherText});
      textAreaRef.current.textContent = "";
      setText("");
      textAreaRef.current.focus();
    }
  }

  const handleEnter = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    return;
  }

  return (
    <div className={`flex flex-row mt-2 ${props.selected ? '' : 'pointer-events-none'}`}>
      <div
        className="border border-black focus:bg-gray-100 focus:outline-none rounded max-h-36 w-[90%] overflow-auto whitespace-pre-wrap"
        contentEditable={props.selected ? true : false}
        onInput={e => setText(e.target.textContent)}
        ref={textAreaRef}
        onKeyDown={e => handleEnter(e)}
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