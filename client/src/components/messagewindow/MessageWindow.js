import MessageDisplay from "./MessageDisplay";
import MessageInput from "./MessageInput";

const MessageWindow = props => {
  return (
    <div className="w-[435px]">
      <MessageDisplay 
        name={props.name}
        selected={props.selected}
        aesKey={props.aesKey}
        iv={props.iv}
      />
      <MessageInput 
        name={props.name}
        selected={props.selected}
        aesKey={props.aesKey}
        iv={props.iv}
        setFirstMessage={x => props.setFirstMessage(x)}
      />
    </div>
    
  )
}

export default MessageWindow;