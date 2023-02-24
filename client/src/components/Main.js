import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const Main = props => {
  const [users, setUsers] = useState([]);
  const readyRef = useRef(false);

  useEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    sendJsonMessage({"ready": 1});
  }, []);

  const { sendJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    share: true,
    onMessage: e => {
      const event = JSON.parse(e.data);
      console.log(event);
      // TODO: for sake of time, not filtering out event.type users, do this later
      setUsers(event.value);
    }
  });

  return (
    <ul>
    {users.map((user, idx) => 
      <li key={idx}>
        {user}
      </li>
    )}
    </ul>
  );
}

export default Main;