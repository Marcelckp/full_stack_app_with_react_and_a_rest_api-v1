import React from 'react'

function NotFound() {
    return (
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! we couldn't find the page you're looking for.</p>
            <p>Click here to return to the home page</p>
            <a href="/"><button className='button'>Home</button></a>
        </div>
    )
}

export default NotFound
