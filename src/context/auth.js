import { createContext } from "react";
import { loginWithGoogle, loginWithNormalUser } from "../services/firebase";
import { useState } from "react";

const AuthContext = createContext()

const AuthProvider = (props) => {
    const [user, setUser] = useState(null)

    const login = async (props) => {
        console.log("props", props)
        let authenticationUser

        if(props?.uid){
            authenticationUser = props
        }else if(props?.displayName){
            authenticationUser = await loginWithNormalUser(props)
        }else{
            authenticationUser = await loginWithGoogle()
        }
        

        if(!authenticationUser){

        }

        sessionStorage.setItem('user', JSON.stringify(authenticationUser))
        setUser(authenticationUser)
    }

    const value = { user, login }

    return <AuthContext.Provider value={value} {...props}/>
}

export { AuthContext, AuthProvider };