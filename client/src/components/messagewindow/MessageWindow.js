import MessageDisplay from "./MessageDisplay";
import MessageInput from "./MessageInput";

const MessageWindow = props => {
  return (
    <div className="w-[435px]">
      <MessageDisplay 
        name={props.name}
        selected={props.selected}
      />
      <MessageInput 
        name={props.name}
        selected={props.selected}
      />
    </div>
    
  )
}

export default MessageWindow;