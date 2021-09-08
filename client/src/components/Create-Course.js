import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { Redirect, useHistory } from 'react-router-dom'

const CreateCourse = () =>{
    let history = useHistory();
    let { data, authenticatedUser } = useContext(Context);
    const [course, setCourse] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        course.id = authenticatedUser.id;
        data.createCourse(course, authenticatedUser.emailAddress, authenticatedUser.password)
            .then( error => {
                if (error.length) {
                    setErrors(error)
                    console.log(error)
                } else {
                    history.push('/')
                }
            })
            .catch(error => {
                console.log(error);
                return <Redirect to='/error' />;
            })
    }

    const updateVal = (e) => {
        setCourse(prevValue => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }
        
    return (
        <div className="wrap">
            <h2>Create Course</h2>

            {
                errors.length 
                    ? 
                    <div className="validation--errors">
                        <h3>Validation Error</h3>
                        <ul>
                            <li>Error</li>
                        </ul>
                    </div>
                    :
                    null
            }

            <form
                errors={course.errors}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input type="text" id='courseTitle' name='courseTitle' onChange={updateVal} />
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id='courseDescription' name='courseDescription' onChange={updateVal} />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" id="estimatedTime" name='estimatedTime' onChange={updateVal} />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <p className='materials-info'>-Separate the different materials with *</p>
                        <textarea id="materialsNeeded" name='materialsNeeded' onChange={updateVal} />
                    </div>
                </div>
                <button className="button" type='submit' onClick={handleSubmit}>Create Course</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default CreateCourse;
