import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';

import ReactMarkdown from 'react-markdown';

function CourseDetails(props) {
    let history = useHistory()
    const [course, setCourse] = useState([]);
    const { authenticatedUser } = useContext(Context)

    useEffect(() => {
        // console.log(props.match.params.id.slice(1))
        axios.get(`http://localhost:5000/api/courses/${props.match.params.id.slice(1)}`)
            .then(async(res) => {
                const co = res.data;
                await setCourse(co.course)
                // console.log(co)
            })
            .catch(err => {
                if (err.message === 'Request failed with status code 404') {
                    history.push('/notFound');
                } else {
                    history.push('/error');
                    console.log(err)
                } 
            })
    },[props.match.params.id, history])

    // console.log(course.materialsNeeded)
    // console.log(course)

    return ( 
        <>
            <div className="actions--bar">
                <div className="wrap">
                {
                    authenticatedUser && authenticatedUser.user.id === course.userId
                    ?
                    <>
                        <a href={`/course/:${props.match.params.id.slice(1)}/update`} className="button">Update Course</a>
                        <a href={`/course/:${props.match.params.id.slice(1)}/delete`} className="button">Delete Course</a>
                    </>
                    : 
                    null
                }
                    
                    <a href="/" className="button button-secondary">Return to Home</a>
                </div>
            </div>
            <div className="wrap">
                <h2>Course Details</h2>
                <form>
                    <div className='main--flex'>
                        <div>
                            <h3 className='course--detail--title'>Course</h3>
                            <h4 className="course--name">{/*courseName*/}{course.title}</h4>
                            <p>{course.user ? `By ${course.user.firstName} ${course.user.lastName}` : null}</p>
                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            {/* <p> courseEstimatedTime </p> */}
                            { !course.estimatedTime 
                                    ?
                                    <p>No Estimated Time / You can complete it on your own pase</p>
                                    :
                                    <p>{ course.estimatedTime }</p>}
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {/* <li> Materials needed as li element received from the course that was fetched from the REST api </li> */}

                                {/* {course.materialsNeeded.map((mats) => {
                                    return <li></li>
                                })} */}
                                {   
                                    !course.materialsNeeded
                                    ?
                                        <li>No Materials Needed</li>
                                    :
                                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                }
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CourseDetails;