import React, { useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'

const Modal = (props) => {
    const modalRef = useRef();
    const { isHome, setModalError, error, errorType, setErrorType } = props

    useEffect(() => {
        const handleClickOutside = e => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            setModalDelete(false)
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    const handleLoginHere = () => {
        setModalError(false)
        props.history.push('/login')
    }

    const handleSignupHere = () => {
        setModalError(false)
        props.history.push('/')
    }

    const handleClose = () => {
        setErrorType('')
        setModalError(false)
    }
    

    return (
        <div className="modal">
            <div className="modal_con" ref={modalRef}>
                <div className="modal_div">
                    <div className="modal_close" onClick={handleClose}>
                        <span>x</span>
                    </div>
                    <div className="modal_body">
                        <h3>Oops!</h3>
                        <p>{ error }</p>
                        <div className="modal_confirm">
                            { errorType == 'isEmpty' ? null :
                                isHome ? (
                                    <button onClick={handleLoginHere}>Login Here</button>
                                ) : (
                                    <button onClick={handleSignupHere}>Sign Up Here</button>
                                )
                            }
                            <button onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Modal)