import React from 'react'
import './style.css'
import { useAuth } from '../../hooks/useAuth'
import LoginForm from '../LoginForm'

const UnauthenticatedApp = () => {
    const { login } = useAuth()

    return (
        <div>
            <h2>Log in to join a chat room!</h2>
            <LoginForm />
            <div className='login'>
                <button onClick={login} className="login-button">
                    Login with Google
                </button>
            </div>
        </div>
    )
}

export default UnauthenticatedApp