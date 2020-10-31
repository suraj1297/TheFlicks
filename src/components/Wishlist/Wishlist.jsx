import React, { useEffect, useState } from 'react'
import MovieTile from '../Movies/MovieTile'
import { Redirect } from "react-router-dom"

export default function Wishlist(props) {

    let ids = []

    const [isLoggedin, setIsLoggedin] = useState(props.isLoggedIn)

    useEffect(() => {

        props.changeMedia("trending")

        return () => {
            props.backToHome()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setIsLoggedin(props.isLoggedIn)
    }, [props.isLoggedIn])

    if (!isLoggedin) {
        return (<Redirect to='/' />)
    }
    else {
        return (
            <div className="movies-container">
                <div className="category">
                    <p>Wishlist</p>
                </div>

                <div className="movie-container">
                    {props.wishlist.filter(movie => {
                        if (ids.includes(movie.id)) {
                            return false
                        } else {
                            ids.push(movie.id)
                            return true
                        }
                    }).map(movie => <MovieTile key={movie.id} {...movie} icon={true} />)}
                </div>

            </div>
        )
    }
}
