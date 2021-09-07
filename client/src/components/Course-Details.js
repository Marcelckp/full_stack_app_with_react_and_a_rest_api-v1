import React from 'react'

function CourseDetails() {
    return ( 
        <>
            <div className="actions--bar">
                <div className="wrap">
                    <a href="/update-course" className="button">Update Course</a>
                    <a href="/delete-course" className="button">Delete Course</a>
                    <a href="/" className="button button-secondary">Return to Home</a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Details</h2>
                <form>
                    <div className='main--flex'>
                        <div>
                            <h3 className='course--detail--title'>Course</h3>
                            <h4 className="course--name">{/*courseName*/}</h4>
                            {/* <p> courseDescription </p> */}
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            {/* <p> courseEstimatedTime </p> */}
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {/* <li> Materials needed as li element received from the course that was fetched from the REST api </li> */}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CourseDetails;