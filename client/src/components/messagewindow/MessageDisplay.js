import { useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const test = [{from: "bob", message: "hello"},
{from: "bob", to: "maaz", message: "hello"},
{from: "bob", to: "maaz", message: "hello"},
{from: "bob", to: "maaz", message: "hello"},
{from: "maaz", to: "bob", message: "hello"},
{from: "jacob", to: "maaz", message: "lol"},
{from: "maaz", to: "jacob", message: "hi"},
];

const MessageDisplay = props => {
  const [messageHistory, setMessageHistory] = useState(test);

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

  return (
    <div className="border border-black rounded h-[250px] overflow-auto">
      <ul>
        {messageHistory.filter(m => m.from === props.selected || m.to === props.selected).map((m, i) => 
          <li key={i}>
            <span className={`${m.from === props.name ? 'text-blue-700' : 'text-red-700'}`}>
              {m.from}: {m.message}
            </span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default MessageDisplay;