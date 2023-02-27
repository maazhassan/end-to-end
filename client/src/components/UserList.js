const UserList = props => {
  return (
    <div>
      <span>Online users: </span>
      <ul>
      {props.users.map((user, idx) => 
        <li key={idx}>
          <button
            className={`border border-black rounded ${props.selected === user ? 'bg-green-300' : 'bg-gray-300'}`}
            onClick={() => props.onSelect(user)}
          >
            {user}
          </button>
        </li>
      )}
      </ul>
    </div>
  )
}

export default UserList;