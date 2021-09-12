import React from 'react'

function Error() {
    return (
        <div className='wrap'>
            <h2>Error!</h2>
            <p>Sorry, we just encountered an unexpected error</p>
            <p>Click here to return to the home page</p>
            <a href="/"><button className='button'>Home</button></a>
        </div>
    )
}

export default Error;
