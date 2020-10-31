import React, { Component } from 'react'
import "./Movies.css"
import axios from "axios"
import MovieTile from './MovieTile'
import Pagination from '../Pagination/Pagination'


export default class Movies extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category: this.props.media !== "trending" ? "popular" : "movie",
            movies: [],
            page: 1,
            totalPages: 0
        }
    }

    fetchData = () => {
        const api = "92a26a0f3494c37de0d782903df76c79"

        let url = null

        if (this.props.media !== "trending")
            url = `https://api.themoviedb.org/3/${this.props.media}/${this.state.category}?api_key=${api}&with_original_language=${this.props.language}&page=${this.state.page}`
        else {
            url = `https://api.themoviedb.org/3/trending/${this.state.category}/day?api_key=${api}`
        }

        axios.get(url)
            .then(response => {
                this.setState({
                    movies: response.data.results,
                    totalPages: response.data.total_pages
                })
            })
    }

    componentDidMount() {
        this.fetchData()
        this.props.changeMedia(this.props.media)
    }

    componentWillUnmount() {
        this.props.backToHome()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props ||
            prevState.category !== this.state.category ||
            prevState.page !== this.state.page
        ) {
            this.fetchData()
        }
    }

    changeCategory = (newCategory) => {
        this.setState({ category: newCategory })

    }

    changePage = (pageNumber) => {
        console.log(pageNumber);
        this.setState({ page: pageNumber })
    }



    render() {

        return (
            <div className="movies-container">

                <div className="category">

                    {
                        this.props.media !== "trending" && (
                            <p id={this.state.category === "popular" ? "active" : ""}
                                onClick={() => this.changeCategory("popular")}>
                                Popular
                            </p>
                        )
                    }
                    {
                        this.props.media !== "trending" && (
                            <p id={this.state.category === "top_rated" ? "active" : ""}
                                onClick={() => this.changeCategory("top_rated")}>
                                Top Rated
                            </p>
                        )
                    }

                    {
                        this.props.media === "movie" && (
                            <p id={this.state.category === "upcoming" ? "active" : ""}
                                onClick={() => this.changeCategory("upcoming")}>
                                Upcoming
                            </p>
                        )
                    }
                    {
                        this.props.media === "trending" && (
                            <p id={this.state.category === "movie" ? "active" : ""}
                                onClick={() => this.changeCategory("movie")}>
                                Movies
                            </p>
                        )
                    }

                    {
                        this.props.media === "trending" && (
                            <p id={this.state.category === "tv" ? "active" : ""}
                                onClick={() => this.changeCategory("tv")}>
                                TV Shows
                            </p>
                        )
                    }

                </div>

                <div className="movie-container">
                    {this.state.movies.filter(movie => {
                        if (movie.poster_path || movie.border_path)
                            return true
                        return false
                    }).map(movie => <MovieTile key={movie.id} {...movie} category_type={this.props.media}
                        askSignIn={this.props.askSignIn} isLoggedIn={this.props.isLoggedIn}
                    />)}
                </div>

                <Pagination totalPages={this.state.totalPages} page={this.state.page} changePage={this.changePage} />

            </div>
        )
    }
}
