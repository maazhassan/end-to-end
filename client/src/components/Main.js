import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import MessageWindow from "./messagewindow/MessageWindow";
import UserList from "./UserList";

const Main = props => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const readyRef = useRef(false);

  useEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    sendJsonMessage({"ready": 1});
  });

  const { sendJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    share: true,
    onMessage: m => {
      const event = JSON.parse(m.data);
      if (event.type === "users") {
        console.log(event);
        setUsers(event.value);
        if (!event.value.includes(selected)) {
          setSelected(null);
        }
      }
    },
    filter: m => {
      const event = JSON.parse(m.data);
      return event.type === "users";
    }
  });

  const onSelect = name => {
    if (selected === name) setSelected(null);
    else setSelected(name);
  }

  return (
    <div className="flex flex-row gap-6">
      <UserList
        users={users.filter(user => user !== props.name)}
        onSelect={name => onSelect(name)}
        selected={selected}
      />
      <MessageWindow 
        name={props.name}
        selected={selected}
      />
    </div>
  );
}

export default Main;