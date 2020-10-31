import "./Pagination.css"
import React from 'react'
import Page from "./Page"

export default function Pagination(props) {

    let pages = []

    for (let i = 1; i <= props.totalPages; i++) {
        pages.push(<Page key={i} value={i} changePage={props.changePage} page={props.page} />)
    }
    return (
        <div className="pagination">
            {pages}
        </div>
    )
}

