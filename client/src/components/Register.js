import { useState } from 'react';

const Register = props => {
  const [name, setName] = useState('');

  return (
    <>
      <label>Name: </label>
      <input
        className="border border-black rounded"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button 
        className="border border-black rounded bg-green-400 ml-1 disabled:bg-red-400"
        onClick={() => props.handleClickRegister(name)}
        disabled={props.connectionStatus !== "Open" || name.length === 0}
      >
        Register
      </button>
      {props.duplicate &&
        <span className="ml-2 text-red-600 font-bold">
          A client with this name is already connected. Try again.
        </span>
      }
      <input
        className="ml-5"
        type="checkbox"
        onChange={e => props.handleClickTutorial(e.target.checked)}
      />
      <label> Show tutorial?</label>
      <p className={`${props.connectionStatus === "Open" ? "text-green-600" : "text-red-600"}`}>
        {props.connectionStatus === "Open" ? "Connected." : "Connecting..."}
      </p>
    </>
  );
}

export default Register;