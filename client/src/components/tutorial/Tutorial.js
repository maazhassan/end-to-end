import TutorialBox from "./TutorialBox";

const Tutorial = props => {
  const primeButton = () => {
    return (
      <button
        className="hover:text-red-600 font-bold"
        onClick={() => console.log("p = " + props.prime)}
      >
        here
      </button>
    )
  }

  const privateKeyButton = () => {
    return (
      <button
        className="hover:text-red-600 font-bold"
        onClick={() => console.log("a = " + props.privateKey)}
      >
        here
      </button>
    )
  }

  const publicKeyButton = () => {
    return (
      <button
        className="hover:text-red-600 font-bold"
        onClick={() => console.log("A = " + props.publicKey)}
      >
        here
      </button>
    )
  }

  const otherPublicKeyButton = () => {
    return (
      <button
        className="hover:text-red-600 font-bold"
        onClick={() => console.log("B = " + props.users[props.selected])}
      >
        here
      </button>
    )
  }

  const secretButton = () => {
    return (
      <button
        className="hover:text-red-600 font-bold"
        onClick={() => console.log("S = " + props.dhSecret)}
      >
        here
      </button>
    )
  }

  const aesButton = () => {
    return (
      <button
        className="hover:text-red-600 font-bold"
        onClick={() => console.log("AES key: " + props.aesKey)}
      >
        here
      </button>
    )
  }

  const firstMessageButton = () => {
    return (
      <button
        className="hover:text-red-600 font-bold"
        onClick={() => console.log("Ciphertext: " + props.firstMessage)}
      >
        here
      </button>
    )
  }

  return (
    <div className={`${props.className} flex flex-col gap-3`}>
      <TutorialBox>
        <span>
          Right after connecting, a 2048 bit prime number <b>p</b> is received from the 
          server. All clients will use the same prime. Click {primeButton()} to view it 
          in your browser console (hexadecimal form). We will use g=2 as our generator.
        </span>
      </TutorialBox>
      <TutorialBox>
        <span>
          Our client also generates a private 2048 bit prime number <b>a</b>.
          Click {privateKeyButton()} to view it in your browser console. A public
          key <b>A</b>=g<sup>a</sup> mod p is then calculated and sent to the server.
          Click {publicKeyButton()} to view it in your browser console.
        </span>
      </TutorialBox>
      <TutorialBox>
        <span>
          Now, connect another client in another tab (make sure to use a different username).
          After, come back here and select it from the online users list above.
        </span>
      </TutorialBox>
      {
        props.firstSelect ? (
          <TutorialBox>
            <span>
              When another user is selected, the server sends their public key, <b>B</b>.
              Click {otherPublicKeyButton()} to view it in your browser console. The shared
              secret <b>S</b>=B<sup>a</sup> mod p is then calculated. Click {secretButton()}
              &nbsp;to view it in your browser console, and compare it to the other client's.
              Now, try sending a message.
            </span>
          </TutorialBox>
        ) : null
      }
      {
        props.firstMessage !== null ? (
          <>
            <TutorialBox>
              <span>
                We hash our shared secret to create a 128 bit AES key. Click {aesButton()} to 
                view it in your browser console. The message is then encrypted before sending
                it to the server. When the other client receives it, they can decrypt it with the
                same key, because AES is symmetric.
              </span>
            </TutorialBox>
            <TutorialBox>
              <span>
                Click {firstMessageButton()} to view the ciphertext in your browser console.
                Since the message is encrypted before being sent, and only decrypted at its
                destination, we call this <b>end-to-end encryption.</b> Not even the server
                can read our message!
              </span>
            </TutorialBox>
            <div className="bg-blue-300 self-start ml-[200px] border border-black rounded">
              <button onClick={() => props.setShowTut(false)}>
                Click here to end the tutorial
              </button>
            </div>
          </>
        ) : null
      }
      
    </div>
  )
}

export default Tutorial;