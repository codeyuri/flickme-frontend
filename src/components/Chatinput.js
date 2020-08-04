import React, { useEffect, useState, useRef } from 'react';

const Chatinput = ({name, message, setMessage, sendMessage, socket}) => {
    const [typing, setTyping] = useState(false);
    const [typingMsg, setTypingMsg] = useState('');
    const keypadRef = useRef(null);

    // kani nga useeffect kay if naay mag type mo send padung sa server kinsa ang nag typing
    useEffect(() => {
        if (typing) {
            socket.emit('isTyping', name);
            setTimeout(() => {
                setTyping(false)
            }, 200)
        }
    }, [typing])

    // sa other users kay maka receive sila ug msg ug kinsa ang nag typing
    useEffect(() => {
        socket.on('isTyping', name => {
            setTypingMsg(`${name || 'Someone'} is typing a message....`)
            setTimeout(() => {
                setTypingMsg(false)
            }, 1400)
        })
    }, [typing])

    const handleKeyDown = ev => {
        if (ev.key == 'Enter' && !ev.shiftKey) {
            sendMessage(ev)
            setTyping(false)
            setTypingMsg(false)
        } else {
            setTyping(true)
        }
    }

    const handleSend = () => { keypadRef.current.focus() }

    return (
        <div className="chat_btm">
            <p className="typing">{ typingMsg }</p>
            <form onSubmit={e => sendMessage(e)}>
                <textarea
                    ref={keypadRef} 
                    type="text" 
                    autoComplete="off"
                    value={message}
                    placeholder="Type a message..." 
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => handleKeyDown(e)}
                    onKeyPress={e => handleKeyDown(e)}
                >
                </textarea>
                <button id="sendbtn" onClick={handleSend}>Send</button>
            </form>
        </div>
    )
}

export default Chatinput