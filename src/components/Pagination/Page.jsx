import React from 'react'

export default function Page(props) {
    return (
        <div
            value={props.value}
            id={props.page === props.value ? "active-page" : ""}
            className="page"
            onClick={() => props.changePage(props.value)}
        >
            {props.value}
        </div>
    )
}
