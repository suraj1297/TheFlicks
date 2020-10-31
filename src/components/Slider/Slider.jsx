import React, { Component } from 'react'
import axios from "axios"
import "./Slider.css"
import MediaTile from './MediaTile'
import { Link } from "react-router-dom"

export default class Slider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    getMedia = () => {
        const api = "92a26a0f3494c37de0d782903df76c79"
        let url = null

        if (this.props.media === "Trending")
            url = `https://api.themoviedb.org/3/trending/all/day?api_key=${api}`
        else if (this.props.media === "Movies")
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${api}&with_original_language=${this.props.language}`
        else if (this.props.media === "TV Shows")
            url = `https://api.themoviedb.org/3/tv/popular?api_key=${api}&with_original_language=${this.props.language}`

        axios.get(url)
            .then(response => {
                this.setState({ list: response.data.results })
            })
    }

    componentDidMount() {
        this.getMedia()
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getMedia()
        }
    }

    render() {
        return (
            <div className="slider-container">
                <div>
                    <h3>{this.props.media}</h3>
                    <Link className="show-more" data-media={this.props.media} to={`/${this.props.media.toLowerCase().replace(" ", "")}`}>
                        show more
                    </Link>
                </div>
                <div className="slider">
                    {this.state.list.slice(0, 20).filter(media => {
                        if (media.poster_path || media.border_path)
                            return true
                        return false
                    }).map(media => <MediaTile key={media.id} {...media} category_type={this.props.media} />)}
                </div>
            </div>
        )
    }
}
