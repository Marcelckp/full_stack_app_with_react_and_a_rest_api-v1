import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom'

const CreateCourse = () => {
    let history = useHistory();
    let { data, authenticatedUser } = useContext(Context);

    const [course, setCourse] = useState({
        courseDescription: '',
        estimatedTime: '',
        courseTitle: '',
        materialsNeeded: '',
        errors: []
    });

    const { courseDescription, courseTitle, materialsNeeded, estimatedTime, errors } = course

    const updateVal = (e) => {
        setCourse(prevValue => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    // console.log(course)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const courseVal = {description: courseDescription, title: courseTitle, materialsNeeded, estimatedTime, userId: authenticatedUser.user.id};
        
        courseVal.userId = authenticatedUser.user.id;
        
        // console.log(courseVal, authenticatedUser.user.emailAddress, authenticatedUser.password)

        data.createCourse(courseVal, authenticatedUser.user.emailAddress, authenticatedUser.password)
            .then( error => {
                if (error.length) {
                    setCourse({
                        errors: error,
                        courseDescription: '',
                        courseTitle: '',
                        materialsNeeded: '',
                        estimatedTime: ''
                    });
                    console.log(error);
                } else {
                    history.push('/');
                    console.log('Course Created Successfully!');
                }
                console.log(courseVal);
            })
            .catch(error => {
                console.log(error);
                history.push('/error');
            })
    }
        
    return (
        <div className="wrap">
            <h2>Create Course</h2>

            {
                errors.length > 0
                    ? 
                    <div className="validation--errors">
                        <h3>Validation Error</h3>
                        <ul>
                            {course.errors.map((err, i) => {
                                return <li key={i}>{err}</li>
                            })}
                        </ul>
                    </div>
                    :
                    null
            }

            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input type="text" id='courseTitle' name='courseTitle' onChange={updateVal} value={courseTitle} />
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id='courseDescription' name='courseDescription' onChange={updateVal} value={courseDescription} />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" id="estimatedTime" name='estimatedTime' onChange={updateVal} value={estimatedTime} />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <p className='materials-info'>-Separate the different materials with *</p>
                        <textarea id="materialsNeeded" name='materialsNeeded' onChange={updateVal} value={materialsNeeded} />
                    </div>
                </div>
                <button className="button" type='submit'>Create Course</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default CreateCourse;
