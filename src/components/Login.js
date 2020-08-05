import React, { useState, useRef, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import Modal from './modal/Modal'

const Login = (props) => {
    let [nameLength, setUsernameLength] = useState(7);
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [isUserIdTheSame, setIsUserIdTheSame] = useState(false);
    const [room, setRoom] = useState('JavaScript');
    const joinRef = useRef(null);

    const handleChangeUser = e => {
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

    useEffect(() => {
        if (localStorage.getItem('userId') != null ) {
            setIsUserIdTheSame(false)
            setUsername(localStorage.getItem('username'))
        } else {
            setIsUserIdTheSame(true)
            setUsername('')
        }
    }, [])
    
    const handleLogin = (e) => {
        e.preventDefault()

        if (!username) { 
            setErrorType('isEmpty')
            setError('Please input something!')
            setModalError(true)
            return false
        }

        try {
            const result = axios.post('http://localhost:7575/login', {username, room})
                .then( res => {
                    // console.log(res)

                    if (res.data.token) {
                        if (res.data.isOnline) {
                            setErrorType('currentlyLoggedIn')
                            setError(`User ${username} is currently logged in! Use another username instead!`)
                            setModalError(true)
                        } else {
                            localStorage.setItem('token', res.data.token)
                            localStorage.setItem('userId', res.data.id)
                            localStorage.setItem('username', res.data.username)
                            localStorage.setItem('room', res.data.room)
                            localStorage.setItem('isOnline', res.data.isOnline)

                            props.history.push('chat');
                        }
                        
                    } else {
                        setErrorType('isNotRegistered')
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

    const handleChangeRoom = (e) => {
        e.preventDefault()
        setIsUserIdTheSame(!isUserIdTheSame)
    }

    return (
        <>
            { modalError && 
                <Modal 
                    isHome={false} 
                    errorType={errorType} 
                    setErrorType={setErrorType} 
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
                                value={ username }
                                autoFocus={true}
                                ref={joinRef} 
                                placeholder="Your Name..." 
                                onChange={e => handleChangeUser(e)}
                            />
                            { isUserIdTheSame && (
                                <>
                                    <select onChange={e => setRoom(e.target.value)} value={room}>
                                        <optgroup label="Select room">
                                            <option value="JavaScript">JavaScript</option>
                                            <option value="Python">Python</option>
                                            <option value="PHP">PHP</option>
                                            <option value="C#">C#</option>
                                            <option value="Ruby">Ruby</option>
                                            <option value="Java">Java</option>
                                        </optgroup>
                                    </select>
                                    
                                </>
                                )
                            }
                            { !isUserIdTheSame && <button onClick={handleChangeRoom}>Change Room</button> }
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
