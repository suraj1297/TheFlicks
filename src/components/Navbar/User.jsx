import React, { useState } from 'react'
import { Link } from "react-router-dom"

export default function User(props) {

    const [display, setdisplay] = useState(false)

    const displayState = () => {
        setdisplay(prevState => !prevState)
    }

    return (
        <>
            <div className="user" onClick={displayState}>{props.userName[0].toUpperCase()}</div>
            {
                display && (
                    <div className="userOptions">
                        <Link to="/wishlist"><p>Wishlist</p></Link>
                        <p onClick={props.logOut}>Log Out</p>
                    </div>)
            }
        </>
    )
}
