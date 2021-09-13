import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';

function CourseUpdate(props) {

    let history = useHistory();
    let { data, authenticatedUser } = useContext(Context);

    const [course, setCourse] = useState({
        description: '',
        estimatedTime: '',
        title: '',
        materialsNeeded: '',
    });

    const [errors, setErrors] = useState([]);

    const courseId = props.match.params.id.slice(1);
    // console.log(courseId);

    // console.log(authenticatedUser.user.id, course.userId)

    const { title, description, materialsNeeded, estimatedTime } = course;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then((res) => {
                const c = res.data;
                setCourse(c.course)
                if (authenticatedUser.user.id !== c.course.userId) history.push('/forbidden');
            })
            .catch(err => {
                if (err.message === 'Request failed with status code 404') {
                    history.push('/notFound');
                } else {
                    // history.push('/error');
                    console.log(err)
                } 
            })
    },[authenticatedUser.user.id, courseId, history, course.userId]);

    console.log(course)

    const updateCourse = (e) => {
        setCourse(prevValue => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
        // console.log(course);
    } 

    // console.log(course);
    console.log(title, description)

    const handleUpdate = (e) => {
        e.preventDefault();

            data.updateCourse(courseId, course, authenticatedUser.user.emailAddress, authenticatedUser.password)
                .then( (errors) => {
                    console.log(errors)

                    if (errors.length) {
                        setCourse({
                            description: '',
                            title: '',
                            estimatedTime: '',
                            materialsNeeded: ''
                        });
                        setErrors(errors);
                    } else {
                        history.push(`/courses/:${courseId}`)
                        console.log('Course Updated Successfully!')
                    }
                })
                .catch( err => {
                    if (!description && !title) {

                        setErrors(['Please provide a value for title & description']);

                    } else if (!description) {

                        setErrors(['Please provide a value for description']);

                    } else if (!title) {

                        setErrors(['Please provide a value for title']);
                        
                    } else {
                        history.push('/error');
                    }               

                    // console.log(errors)
                    console.log(course)
                })         
    }
    

    return ( 
        <div className='wrap'>
            <h2>Update Course</h2>

            {
                errors.length > 0?
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
                        <input type="text" id='courseTitle' name="title" onChange={updateCourse} defaultValue={title} />
                        <p>By {authenticatedUser.user.firstName} {authenticatedUser.user.lastName}</p>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id='courseDescription' name="description" onChange={updateCourse} defaultValue={description} />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" id='estimatedTime' name="estimatedTime" onChange={updateCourse} defaultValue={estimatedTime} />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
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