import Register from './Register';
import Main from './Main';
import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const App = () => {
  const [userID, setUserID] = useState(-1);
  const [name, setName] = useState("");
  const [prime, setPrime] = useState(0);
  const [tut, setTut] = useState(false);

  const { sendJsonMessage, readyState } = useWebSocket(process.env.REACT_APP_WS_URL, {
    share: true,
    onOpen: () => {
      console.log("Websocket connection established.");
    },
    onMessage: m => {
      const event = JSON.parse(m.data);
      if (event.type === "register") {
        setUserID(event.id);
        setPrime(event.prime);
      }
    },
    filter: m => {
      const event = JSON.parse(m.data);
      return event.type === "register";
    },
    shouldReconnect: () => true,
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

  const handleClickTutorial = v => {
    setTut(v);
  }

  return (
    <div className="ml-2 mt-4">
    {
      userID < 0 ? (
        <Register
          handleClickRegister={n => handleClickRegister(n)}
          handleClickTutorial={v => handleClickTutorial(v)}
          connectionStatus={connectionStatus}
          duplicate={userID === -2}
        />
      ) : (
        <Main
          name={name}
          prime={prime}
          tut={tut}
        />
      )
    }
    </div>
  );
}

export default App;
