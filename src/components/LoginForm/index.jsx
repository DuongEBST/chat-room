import React, { useRef, useState } from 'react'
import "./styles.css"

const LoginForm = ({ login, hanldeSubmit, isExistAccount, avatarRef, user, switchForm, hanldeChangeFile, handleChange, errorUser }) => {

    return (
        <div className='form-container'>
            <form onSubmit={hanldeSubmit} style={{width: "100%"}}>
                <h3 className='form-title'>{isExistAccount ? "Sign in" : "Sign up"}</h3>
                <div>
                    {!isExistAccount &&
                        <div className='avatar-container'>
                            <input
                                type='file'
                                accept="image/*"
                                onChange={hanldeChangeFile}
                                className='img-field'
                                ref={avatarRef}
                            />

                            <img
                                onClick={() => avatarRef.current.click()}
                                src={user.avatarPreview ? user.avatarPreview : "/img/user.png"}
                                className='avatar-form'
                            />
                        </div>
                    }

                    <div className='form-input-layout'>
                        <div style={{marginBottom: "10px"}}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={user.displayName}
                                onChange={handleChange}
                                className="input-field"
                                name="displayName"
                            />
                            {errorUser?.displayName && <span style={{color: "#970220", paddingLeft: "5px", fontSize: "14px"}}>{errorUser?.displayName}</span>}
                        </div>

                        <div style={{marginBottom: "10px"}}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={user.password}
                                onChange={handleChange}
                                className="input-field"
                                name="password"
                            />
                            {errorUser?.password && <span style={{color: "#970220", paddingLeft: "5px", fontSize: "14px"}}>{errorUser?.password}</span>}
                        </div>

                        {!isExistAccount &&
                            <div style={{marginBottom: "10px"}}>
                                <input
                                    type="password"
                                    placeholder="Re-password"
                                    value={user.rePassword}
                                    onChange={handleChange}
                                    className="input-field"
                                    name="rePassword"
                                />
                                {errorUser?.rePassword && <span style={{color: "#970220", paddingLeft: "5px", fontSize: "14px"}}>{errorUser?.rePassword}</span>}
                            </div>
                        }
                    </div>
                </div>

                <button className='form-btn'>{isExistAccount ? "Sign in" : "Sign up"}</button>
                {isExistAccount &&
                    <button onClick={login} className="form-btn gg">
                        Login with Google
                    </button>
                }
            </form>

            <div>
                <p>
                    {isExistAccount ? "Haven't account yet?" : "Already an account?"}
                    <span onClick={switchForm}>{isExistAccount ? "Sign up" : "Sign in"}</span>
                </p>
            </div>
        </div>
    )
}

export default LoginForm