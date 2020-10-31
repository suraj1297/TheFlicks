import React, { useContext } from 'react'
import { TrailerContext } from "../../App.js"

export default function MediaTile(props) {

    const trailer = useContext(TrailerContext)

    let path = props.poster_path == null ? props.border_path : props.poster_path
    let imageUrl = null;
    if (path)
        imageUrl = `https://image.tmdb.org/t/p/w500/${path}`


    return (


        <div className="media-tile">

            <img src={imageUrl} alt={props.title} onClick={() => trailer(props)} />

        </div>
    )
}
