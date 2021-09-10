import axios from 'axios'
import React, {useEffect, useState} from 'react'

function Home() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(res => {
                const courses = res.data;
                setCourses(courses.courses);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    console.log(courses);

    return (
        <div className='wrap main--grid'>
            {courses.map((course) => {
                return (
                    <a className='course--module course--link' href={`courses/:${course.id}`} key={course.id} >
                        <h2 className='course--label'>Course</h2>
                        <h3 className='course--title'>{course.title}</h3>
                    </a>);
            })}
            <a href={`/course/create`} className="course--module course--add--module">
                <span className="course--add--title">
                    <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 13 13' className='add'>
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                    New Course
                </span>
            </a>
        </div>
    )
}

export default Home
