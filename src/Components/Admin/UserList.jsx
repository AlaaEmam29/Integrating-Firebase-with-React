import React from 'react'

export default function UserList({users}) {
    return <div className='users'>
     <div className='user'>
    {users.map(user => (
      <div className='user-info' key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </div>
    ))}
      
  </div>
    
    </div>
}
