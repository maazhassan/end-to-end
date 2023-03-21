import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import MessageWindow from "./messagewindow/MessageWindow";
import UserList from "./UserList";
import { createDiffieHellman } from "diffie-hellman";
import { MD5, enc } from "crypto-js";
window.Buffer = window.Buffer || require("buffer").Buffer;

const Main = props => {
  const [users, setUsers] = useState({});
  const [selected, setSelected] = useState(null);
  const [DH, setDH] = useState(null);
  const [aesKey, setKey] = useState(null);
  const [IV, setIV] = useState(null);

  const initRef = useRef(false);

  // eslint-disable-next-line
  useEffect(() => {
    // Run only on the first render
    if (initRef.current) return;
    initRef.current = true;

    const dh = createDiffieHellman(props.prime, "hex");
    const pubKey = dh.generateKeys("hex");
    setDH(dh);
    sendJsonMessage({pubKey: pubKey.toString("hex")});

    const iv = enc.Utf8.parse("0");
    setIV(iv);
  });

  const { sendJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    share: true,
    onMessage: m => {
      const event = JSON.parse(m.data);
      if (event.type === "users") {
        console.log(event);
        setUsers(event.value);
        if (!Object.keys(event.value).includes(selected)) {
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
    if (selected === name){
      setSelected(null);
    }
    else {
      setSelected(name);
      const buf = Buffer.from(users[name], "hex");
      const secret = DH.computeSecret(buf).toString("hex");
      // All this logging to get this to work oof
      // console.log(users[name]);
      // console.log(users[name].length)
      // console.log(DH.getPublicKey("hex") === users[props.name]);
      // console.log("DH pubKey: " + DH.getPublicKey("hex"));
      // console.log(DH.getPublicKey("hex").length);
      // console.log("State pubKey: " + users[props.name]);
      // console.log(users[props.name].length);
      // console.log(DH.getPublicKey("hex") === users[props.name]);
      // console.log("Private key: " + DH.getPrivateKey("hex"));
      // console.log(DH.getPrivateKey("hex").length);
      // console.log("Secret: " + secret);
      // console.log("Prime: " + DH.getPrime("hex"));
      // console.log(DH.getPrime("hex").length);
      // console.log(DH.getPrime("hex") === props.prime);
      // console.log(users);
      // console.log(DH.getGenerator("hex"));
      setKey(MD5(secret));
    }
  }

  return (
    <div className="flex flex-row gap-6">
      <UserList
        users={Object.keys(users).filter(user => user !== props.name)}
        onSelect={name => onSelect(name)}
        selected={selected}
      />
      <MessageWindow 
        name={props.name}
        selected={selected}
        aesKey={aesKey}
        iv={IV}
      />
    </div>
  );
}

export default Main;