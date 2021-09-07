import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseDelete(props) {

    const [course, setCourse] = useState([]);
    const courseId = props.match.params.id.slice(1);
    // console.log(courseId);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(res => {
                const c = res.data;
                setCourse(c.course)
            })
            .catch(err => {
                console.log(err)
            })
    }, [courseId])

    console.log(course)

    return (
        <div className="wrap form--centered">
            <h2>Are you sure you want to delete This Course?</h2>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <button className="button" type='submit'>Delete Course</button>
            <a href="/" className="button button-secondary">Cancel</a>
        </div>
    )
}

export default CourseDelete;
