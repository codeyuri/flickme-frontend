import React, { useState, useRef, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import Modal from './modal/Modal'

const Home = (props) => {
    let [nameLength, setUsernameLength] = useState(7);
    const [error, setError] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('JavaScript');
    const joinRef = useRef(null);

    // const { socket } = props

    useEffect(() => {
        joinRef.current.focus();
    }, []);

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

        let isLoggedIn = false;

        if (!username) { 
            setError('Please input something!')
            setIsEmpty(true)
            setModalError(true)
            return false
        }
        
        isLoggedIn = true;

        let newUser = {
            username: username || localStorage.getItem('username'),
            room: room || localStorage.getItem('room'),
            dateJoined: new Date().toISOString(),
            isOnline: false
        }

        try {
            const result = axios.post('http://localhost:7575/createUsers', newUser)
                .then( res => {
                    localStorage.setItem('userId', res.data[0].results.data)

                    if ( res.data[0].isAccess ) {
                        props.history.push("/login");
                    } else {
                        setError(`Sign up failed! User ${username} already exists. Please use another username!`)
                        setModalError(true)
                    }
                })
            // console.log(`added to db: ${result}`)

            // localStorage.setItem('username', username)
            // localStorage.setItem('room', room)
            // localStorage.setItem('isLoggedIn', isLoggedIn)
            
        } catch (e) {
            console.log(e);
        }

    }

    const handleClickJoin = (e) => {
        e.preventDefault()
        props.history.push('/login')
    }

    return (
        <>
            { modalError && 
                <Modal 
                    isHome={true} 
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
                        <h5>Register</h5>
                        <form onSubmit={handleLogin}>
                            <span>{nameLength}/7</span>
                            {/* <p>{ error }</p> */}
                            <input 
                                type="text"
                                value={username}
                                autoFocus={true} 
                                ref={joinRef} 
                                placeholder="Your Name..." 
                                onChange={e => handleChange(e)}
                            />
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
                            <div className="submit_div">
                                <button type="submit" className="signin">Join Chat</button>
                            </div>
                        </form>
                        <div className="login_btm">
                            <p>Already have an account? <b onClick={handleClickJoin}>Login here!</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default withRouter(Home);