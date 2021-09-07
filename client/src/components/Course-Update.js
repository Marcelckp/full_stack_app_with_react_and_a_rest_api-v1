import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseUpdate(props) {

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
                console.log(err);
                props.history.push('/error')
            })
    }, [courseId, props.history])


    // console.log(course)

    return ( 
        <div className='wrap'>
            <h2>Update Course</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input type="text" id='courseTitle' name="courseTitle" value={course.title} />
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id='courseDescription' name="courseDescription" value={course.description} />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" id='estimatedTime' name="estimatedTime" value={course.estimatedTime} />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <p className='materials-info'>-Separate the different materials with *</p>
                        <textarea id='materialsNeeded' name="materialsNeeded" value={course.materialsNeeded} />
                    </div>
                </div>
                <button className="button" type='submit'>Update Course</button>
                <a href="/" className="button button-secondary">Cancel</a>
            </form>
        </div>
    )
}

export default CourseUpdate;