import React, { useContext } from 'react'
import { TrailerContext, WishListContext } from "../../App.js"

export default function MovieTile(props) {

    const trailer = useContext(TrailerContext)
    const wishList = useContext(WishListContext)

    let path = props.poster_path == null ? props.border_path : props.poster_path
    let imageUrl = null;
    if (path)
        imageUrl = `https://image.tmdb.org/t/p/w500/${path}`

    return (
        <div className="movie">
            {!props.icon &&
                <i className="fa fa-heart-o" aria-hidden="true" onClick={() => {
                    if (props.isLoggedIn)
                        wishList(props)
                    else
                        props.askSignIn("signin")
                }}></i>
            }
            <img src={imageUrl} alt={props.title} onClick={() => trailer(props)} />
        </div>
    )
}
