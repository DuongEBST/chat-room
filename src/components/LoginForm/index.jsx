import React, { useState } from 'react'
import { v4 as uuid } from "uuid";
import { loginWithNormalUser } from '../../services/firebase';

const userObject = {
    uid: "",
    displayName: "",
    avatarPreview: "",
    file: null,
}

const LoginForm = ({login}) => {
    const [user, setUser] = useState(userObject)

    const handleChange = (e) => {
        setUser({
            ...user,
            displayName: e.target.value,
            uid: uuid()
        })
    }

    const hanldeChangeFile = (e) => {
        setUser({
            ...user,
            avatarPreview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }

    const hanldeSubmit = (e) => {
        e.preventDefault();
        login(user)
        setUser(userObject)
    }   

    return (
        <div>
            <form onSubmit={hanldeSubmit}>
                <input
                    type="text"
                    placeholder="Enter a username"
                    value={user.displayName}
                    onChange={handleChange}
                    className="message-input"
                />
                <input 
                    type='file'
                    accept="image/*"
                    onChange={hanldeChangeFile}
                />
            </form>
        </div>
    )
}

export default LoginForm