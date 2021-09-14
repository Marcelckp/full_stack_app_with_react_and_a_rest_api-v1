import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';

const CourseDelete = (props) => {

    let history = useHistory()
    const [course, setCourse] = useState([]);

    // retrieves the course id from the url param '/:id'
    const courseId = props.match.params.id.slice(1);
    // console.log(courseId);

    const { data, authenticatedUser } = useContext(Context)

    //react hook
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(async(res) => {
                const c = res.data;
                await setCourse(c.course)
                
                // if the courses user id is not equal to the current authenticated users id the they are forbidden to perform actions on the course so they are sent to the /forbidden route
                if (authenticatedUser.user.id !== c.course.userId) history.push('/forbidden');
            })
            .catch(err => {
                if (err.message === 'Request failed with status code 404') {
                    history.push('/notfound');
                } else {
                    history.push('/error');
                    console.log(err)
                } 
            })
    }, [courseId, authenticatedUser.user.id, course.userId, history])

    // console.log(course) 
    // console.log(authenticatedUser)
    // console.log(authenticatedUser.user.emailAddress, authenticatedUser.password, authenticatedUser.user.id)

    const handleDelete = (e) => {
        // e.preventDefault();
        // console.log(course.userId)

            data.deleteCourse(courseId, authenticatedUser.user.emailAddress, authenticatedUser.password);
            history.push('/')
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
