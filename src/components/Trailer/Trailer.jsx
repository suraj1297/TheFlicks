import React, { Component } from 'react'
import axios from "axios"
import "./Trailer.css"

export default class Trailer extends Component {

    constructor() {
        super()
        this.state = {
            video: null,
            media: {}
        }
    }

    componentDidMount() {
        const movie = JSON.parse(localStorage.getItem("trailer"))
        console.log(movie);
        let apiKey = "92a26a0f3494c37de0d782903df76c79"
        let url = null
        console.log(movie.media_type)
        if (movie.media_type)
            url = `https://api.themoviedb.org/3/${movie.media_type}/${movie.id}/videos?api_key=${apiKey}&language=${movie.original_language}`
        else if (movie.category_type) {
            let media_type = ["Movies", "movie"].includes(movie.category_type) ? "movie" : "tv"
            url = `https://api.themoviedb.org/3/${media_type}/${movie.id}/videos?api_key=${apiKey}&language=${movie.original_language}`
        }
        console.log(movie.category_type);
        console.log(url);
        axios.get(url)
            .then(response => {
                if (response.data.results.length) {
                    this.setState({
                        video: `https://www.youtube.com/embed/${response.data.results[0].key}`,
                        media: movie
                    })
                }
            })
            .catch(error => console.log(error))

    }

    componentWillUnmount() {
        // sessionStorage.removeItem("trailer")
        sessionStorage.clear();
    }

    render() {
        console.log(this.state);
        return (
            <div className="details-container">
                <div className="movie-details">
                    <h1>{this.state.media.title ? this.state.media.title : this.state.media.name}</h1>
                    <p>Popularity: <i className="fa fa-star" aria-hidden="true"></i> <span>{this.state.media.popularity}</span></p>
                    <p>Vote Counts: <i className="fa fa-thumbs-up" aria-hidden="true"></i> <span>{this.state.media.vote_average}</span></p>
                    <h3>Overview</h3>
                    <div>
                        {this.state.media.overview}
                    </div>
                </div>
                <iframe src={this.state.video} title={this.state.title}></iframe>
            </div>
        )
    }
}
