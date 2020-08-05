import React from 'react';
import { withRouter } from 'react-router-dom'

const OnlineUsers = (props) => {

    const { users, room, navOpen } = props

    const handleLeave = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('room')
        localStorage.removeItem('isOnline')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')

        // we did not use props here, kay ig leave room, dili ma clear ang localstorage datas
        // if dili ma refresh ang site or page
        
        // props.history.push('/')
    }
    
    return (
        <div className={navOpen ? 'users_div active' : 'users_div'}>
            <h4>Room: {room}</h4>
            <a href="/" onClick={handleLeave}><button>Leave Room?</button></a>
            {users ? (
                <>
                    
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>{user.username}</li>
                        ))}
                    </ul>
                </>
            ) : null }
      </div>
    )
};

export default withRouter(OnlineUsers);