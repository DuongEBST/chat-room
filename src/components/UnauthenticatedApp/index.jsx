import React, { useRef, useState } from 'react'
import './style.css'
import { v4 as uuid } from "uuid";
import { useAuth } from '../../hooks/useAuth'
import LoginForm from '../LoginForm'
import { getAllUser } from '../../services/firebase';

const UnauthenticatedApp = () => {
    const { login } = useAuth()
    const avatarRef = useRef(null)
    const [isExistAccount, setIsExistAccount] = useState(false)
    const userObject = {
        displayName: "",
        avatarPreview: "",
        file: null,
        password: "",
        rePassword: "",
    }
    const [user, setUser] = useState(userObject)
    const [errorUser, setErrorUser] = useState(null)

    const handleChange = (e) => {
        let { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const hanldeChangeFile = (e) => {
        setUser({
            ...user,
            avatarPreview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }

    const hanldeSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()){
            if (isExistAccount) {
                let userData = await checkExistUser()
            
                if (userData) {
                    login(userData)
                    setUser(userObject)  
                    return
                }
                return
            }

            login(user)
            setUser(userObject)        
        }
    }

    const switchForm = () => {
        setIsExistAccount(!isExistAccount)
    }

    const validateForm = () => {
        const errors = {};

        if (!user.displayName) {
            errors.displayName = "Please enter username";
        }

        if (!user.password) {
            errors.password = "Please enter password";
        }

        if (!isExistAccount) {
            if (!user.rePassword) {
                errors.rePassword = "Please enter re-password";
            } 
            
            if(user.password && user.rePassword){
                console.log("sdasds", user.password?.localeCompare(user.rePassword))
                if (user.password?.localeCompare(user.rePassword) !== 0) {
                    errors.rePassword = "Password and re-password not match";
                } 
            }
        }

        if(Object.keys(errors || {}).length > 0){
            setErrorUser(errors);
            return false
        }

        return true
    }

    const checkExistUser = async () => {
        try {
            let allUser = await getAllUser()
          
            let userData = null
            for (let item of allUser) {
                if (item?.displayName?.localeCompare(user.displayName) === 0 && item?.password?.localeCompare(user.password) === 0) {
                    userData = item
                    break
                }
            }

            return userData
        } catch (error) {
            
        }
    }

    return (
        <div>
            <LoginForm 
                login={login}
                switchForm={switchForm}
                hanldeSubmit={hanldeSubmit}
                hanldeChangeFile={hanldeChangeFile}
                handleChange={handleChange}
                avatarRef={avatarRef}
                isExistAccount={isExistAccount}
                user={user}
                errorUser={errorUser}
            />
        </div>
    )
}

export default UnauthenticatedApp