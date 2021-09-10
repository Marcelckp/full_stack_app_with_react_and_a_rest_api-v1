import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CourseDetails(props) {
    let history = useHistory()
    const [course, setCourse] = useState([]);

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

    // if (course === []) {
    //     history.push('/notFound')
    // }
    
    // console.log(course)

    const coursesSplit = `${course.materialsNeeded}`;
    const cS = coursesSplit.slice(1).split('*');
    // console.log(cS)

    return ( 
        <>
            <div className="actions--bar">
                <div className="wrap">
                    <a href={`/course/:${props.match.params.id.slice(1)}/update`} className="button">Update Course</a>
                    <a href={`/course/:${props.match.params.id.slice(1)}/delete`} className="button">Delete Course</a>
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
                            {/* <p> courseDescription </p> */}
                            <p>{course.description}</p>
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
                                {   cS.length === 1
                                    ?
                                        <li>No Materials Needed</li>
                                    :
                                    cS.map((c, index) => {
                                    return <li key={index}>{c}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CourseDetails;