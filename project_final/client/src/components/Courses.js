import React, { useEffect,useState } from 'react';
import {
  NavLink
} from 'react-router-dom';

import NewCourseButton from './NewCourseButton';

/*
    This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. 
    Each course needs to link to its respective "Course Detail" screen. 
    This component also renders a link to the "Create Course" screen.
*/

const Courses = (props) => {

    const [coursesData, setData] = useState([]);
    const { context } = props;

    useEffect(() => {
       context.data.getCourses()
        .then((responseData) => {
        setData(responseData);
      })
      // //this anonymous function works similar to componentWillUnmount empties setdata array
      // return () => {
      //   setData([])
      // }
    }, [context])

    return (
        <div className="bounds">
            <div className="bounds">
              {coursesData.map((course) => (
                <div className="grid-33" key={course.id}>
                    <NavLink
                      to={"/courses/" + course.id}
                      className="course--module course--link"
                    >
                    <h4 className="course--label">Courses</h4>
                    <h3 className="course--title">{course.title}</h3>
                  </NavLink>
                </div>
              ))}
              <NewCourseButton />
            </div>
        </div>
    );
}

export default Courses;