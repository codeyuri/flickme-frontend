import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import Modal from './modal/Modal'

const Login = (props) => {
    let [nameLength, setUsernameLength] = useState(7);
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [modalError, setModalError] = useState(false);
    const joinRef = useRef(null);

    const handleChange = e => {
        let len = e.target.value.length;
        if ( len === 0 ) {
            setUsernameLength(7)
            setUsername(e.target.value)
        } else if ( len > 7 ) {
            return false
        } else {
            setUsernameLength(7 - len)
            setUsername(e.target.value)
        }
    }
    
    const handleLogin = (e) => {
        e.preventDefault()

        if (!username) { 
            setError('Please input something!')
            setIsEmpty(true)
            setModalError(true)
            return false
        }

        // let newUser = {
        //     username: username || localStorage.getItem('username')
        // }

        try {
            const result = axios.post('http://localhost:7575/login', {username})
                .then( res => {
                    console.log(res)

                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('username', res.data.username)
                        localStorage.setItem('room', res.data.room)
                        // localStorage.setItem('userId', res.data.status)
                        localStorage.setItem('isLoggedIn', true)
        
                        props.history.push('chat');
                    } else {
                        setError(`User ${username} is not registered! Please sign up first!`)
                        setModalError(true)
                    }
                })
            
        } catch(e) {
            console.log(e)
        }
    }

    const handleClickJoin = (e) => {
        e.preventDefault()
        props.history.push('/')
    }

    return (
        <>
            { modalError && 
                <Modal 
                    isHome={false} 
                    isEmpty={isEmpty} 
                    setIsEmpty={setIsEmpty} 
                    setModalError={setModalError} 
                    error={error}
                /> 
            }
            <div className="login">
                <div className="login_con">
                    <div className="login_body">
                        <h2>Flickme!</h2>
                        <h5>Login</h5>
                        <form onSubmit={handleLogin}>
                            <span>{nameLength}/7</span>
                            <input 
                                type="text"
                                value={username}
                                autoFocus={true} 
                                ref={joinRef} 
                                placeholder="Your Name..." 
                                onChange={e => handleChange(e)}
                            />
                            <div className="submit_div">
                                <button type="submit" className="signin">Join Chat</button>
                            </div>
                        </form>
                        <div className="login_btm">
                            <p>Not yet registered? <b onClick={handleClickJoin}>Sign up here!</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Login)
