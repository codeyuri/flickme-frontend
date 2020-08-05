import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({msg: { sender, message, date}, currentUserName}) => {
    let currentUser = false;
    let admin = false;

    if(sender === currentUserName) {
        currentUser = true;
    }

    if(sender === 'Admin') {
        admin = true;
    }

    return (
        <div className={ admin ? 'msg_con admin' : 'msg_con' }>
            <div className={ currentUser ? 'msg_box current' : 'msg_box' }>
                <small>{ currentUser ? currentUserName : sender }</small>
                <div className="msg">
                    <p>{ReactEmoji.emojify(message)}</p>
                </div>
                <span>{new Date(date).toLocaleTimeString()}</span>
            </div>
        </div>
    )
}

export default Message
