import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const MessageDisplay = props => {
  const [messageHistory, setMessageHistory] = useState([]);

  const displayRef = useRef(null);

  useEffect(() => {
    displayRef.current.scrollTop = displayRef.current.scrollHeight;
    console.log("scrolled")
  }, [messageHistory, props.selected]);

  useWebSocket(process.env.REACT_APP_WS_URL, {
    share: true,
    onMessage: m => {
      const event = JSON.parse(m.data);
      if (event.type === "message") {
        console.log(event);
        setMessageHistory(
          [
            ...messageHistory,
            { from: event.from, to: event.to, message: event.message }
          ]
        );
      }
    },
    filter: m => {
      const event = JSON.parse(m.data);
      return event.type === "message";
    }
  });

  const displayFilter = m => {
    return (m.from === props.selected && m.to === props.name)
    || (m.from === props.name && m.to === props.selected);
  }

  return (
    <div className="border border-black rounded h-[250px] overflow-auto" ref={displayRef}>
      <ul>
        {messageHistory.filter(displayFilter).map((m, i) => 
          <li key={i}>
            <span className={`${m.from === props.name ? 'text-blue-700' : 'text-red-700'} break-all`}>
              {m.from}: {m.message}
            </span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default MessageDisplay;