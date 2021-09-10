import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';

function CourseUpdate(props) {

    let history = useHistory();
    let { data, authenticatedUser } = useContext(Context);

    const [course, setCourse] = useState([]);

    const courseId = props.match.params.id.slice(1);
    // console.log(courseId);

    // console.log(authenticatedUser.user.id, course.userId)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(async(res) => {
                const c = res.data;
                await setCourse(c.course)
                if (authenticatedUser.user.id !== c.course.userId) history.push('/unAuthorized');
            })
            .catch(err => {
                if (err.message === 'Request failed with status code 404') {
                    history.push('/notFound');
                } else {
                    history.push('/error');
                    console.log(err)
                } 
            })
    },[authenticatedUser.user.id, courseId, history, course.userId]);

    const updateCourse = (e) => {
        setCourse(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        // console.log(course);
    } 

    const { title, description, courseDescription, courseTitle, materialsNeeded, estimatedTime, errors } = course;

    // console.log(courseTitle, courseDescription)

    const handleUpdate = (e) => {
        e.preventDefault();

        const courseValue = { description: courseDescription, title: courseTitle, materialsNeeded, estimatedTime };

        courseValue.userId = authenticatedUser.user.id;

            data.updateCourse(courseId, courseValue, authenticatedUser.user.emailAddress, authenticatedUser.password)
                .then( err => {
                    if (err.length) {
                        setCourse({
                            errors: err,
                            // courseTitle: '',
                            // courseDescription: '',
                            // materialsNeeded: '',
                            // estimatedTime: ''
                        });
                        console.log(err)
                    } else {
                        history.push('/')
                        console.log('Course Updated Successfully!')
                    }
                })
                .catch( err => {
                    console.log(err);
                    history.push('/error')
                })         
    }
    

    return ( 
        <div className='wrap'>
            <h2>Update Course</h2>

            {
                errors ?
                <div className="validation--errors">
                    <h3>Validation Error</h3>
                    <ul>
                        {errors.map((error, i) => {
                            return <li key={i}>{error}</li>
                        })}
                    </ul>
                </div>
                : null
            }

            <form onSubmit={handleUpdate}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input type="text" id='courseTitle' name="courseTitle" onChange={updateCourse} defaultValue={title} />
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id='courseDescription' name="courseDescription" onChange={updateCourse} defaultValue={description} />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" id='estimatedTime' name="estimatedTime" onChange={updateCourse} defaultValue={estimatedTime} />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <p className='materials-info'>-Separate the different materials with *</p>
                        <textarea id='materialsNeeded' name="materialsNeeded" onChange={updateCourse} defaultValue={materialsNeeded} />
                    </div>
                </div>
                <button className="button" type='submit'>Update Course</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default CourseUpdate;