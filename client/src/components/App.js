import Register from './Register';
import Main from './Main';
import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const App = () => {
  const [userID, setUserID] = useState(-1);
  const [name, setName] = useState("");

  const { sendJsonMessage, readyState } = useWebSocket(process.env.REACT_APP_WS_URL, {
    share: true,
    onOpen: () => {
      console.log("Websocket connection established.");
    },
    onMessage: e => {
      const event = JSON.parse(e.data);
      if (event.type === "register") {
        console.log(event);
        setUserID(event.id);
      }
    },
    filter: message => {
      const event = JSON.parse(message.data);
      return event.type === "register";
    }
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleClickRegister = n => {
    sendJsonMessage({name: n});
    setName(n);
  }

  return (
    <div className="ml-2 mt-4">
    {
      userID === -1 ? (
        <Register
          handleClickRegister={n => handleClickRegister(n)}
          connectionStatus={connectionStatus}
        />
      ) : (
        <Main
          name={name}
        />
      )
    }
    </div>
  );
}

export default App;
