import MessageDisplay from "./MessageDisplay";
import MessageInput from "./MessageInput";

const MessageWindow = props => {
  return (
    <div>
      <MessageDisplay 
        name={props.name}
        selected={props.selected}
      />
      <MessageInput />
    </div>
    
  )
}

export default MessageWindow;