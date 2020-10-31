import React from 'react'

export default function SignInUp(props) {
    return (
        <>
            <div className="signin" onClick={() => props.askSignInUp("signin")}>SignIn</div>
            <div className="signup" onClick={() => props.askSignInUp("signup")}>SignUp</div>
        </>
    )
}
