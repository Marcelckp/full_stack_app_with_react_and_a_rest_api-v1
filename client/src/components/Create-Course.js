import React from 'react';

function CreateCourse() {
    return (
        <div className="wrap">
            <h2>Create Course</h2>
            {/* <div className="validation--errors">
                <h3>Validation Error</h3>
                <ul>
                    <li>Error</li>
                </ul>
            </div> */}
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input type="text" id='courseTitle' name='courseTitle' />
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id='courseDescription' name='courseDescription' />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input type="text" id="estimatedTime" name='estimatedTime' />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name='materialsNeeded' />
                    </div>
                </div>
                <button className="button">Create Course</button>
                <button className="button button-secondary" alt='Cancel button'>
                    <a href="/">Cancel</a>
                </button>
            </form>
        </div>
    )
}

export default CreateCourse;
