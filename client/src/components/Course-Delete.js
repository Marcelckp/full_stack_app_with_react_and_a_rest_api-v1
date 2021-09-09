import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';

const CourseDelete = (props) => {

    let history = useHistory()
    const [course, setCourse] = useState([]);
    const courseId = props.match.params.id.slice(1);
    // console.log(courseId);

    const { data, authenticatedUser } = useContext(Context)

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

    // console.log(course) 
    // console.log(authenticatedUser)
    // console.log(authenticatedUser.user.emailAddress, authenticatedUser.password, authenticatedUser.user.id)

    const handleDelete = (e) => {
        // e.preventDefault();
        // console.log(course.userId) 
        // console.log(authenticatedUser.user.id)

        if (course === null) history.push('/notFound')

        else if (authenticatedUser.user.id !== course.userId) history.push('/UnAuthorized')

        else {
            data.deleteCourse(courseId, authenticatedUser.user.emailAddress, authenticatedUser.password);
            history.push('/')
        }
    }

    return (
        <div className="wrap form--centered">
            <h2>Are you sure you want to delete This Course?</h2>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <form onSubmit={handleDelete}>
                <button className="button" type='submit'>Delete Course</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default CourseDelete;
