const TutorialBox = props => {
  return (
    <div className="w-[650px] h-[75px] bg-yellow-200 border border-black rounded">
      {props.children}
    </div>
  )
}

export default TutorialBox;