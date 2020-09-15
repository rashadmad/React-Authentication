import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown'
import {
  NavLink
} from 'react-router-dom';

/*
  This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. 
  The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. 
  This component also renders an "Update Course" button for navigating to the "Update Course" screen.
*/

const CourseDetail = (props) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [author, setAuthor] = useState("");
  const authUser = props.context.authenticatedUser;

  const { context } = props;
  const idFromUrl = props.match.params.id

  //add the currently selected courses to state
  useEffect(() => {
    context.data.getCourse(idFromUrl)
    .then((selectedCourse) => {
      setTitle(selectedCourse.title);
      setDescription(selectedCourse.description);
      setEstimatedTime(selectedCourse.estimatedTime);
      setMaterialsNeeded(selectedCourse.materialsNeeded);
      setAuthor(selectedCourse.User);
    });
  }, [idFromUrl,context]);

  const deleteCourseButtonClick = () => {
        const { context } = props;
        debugger
        if(context.authenticatedUser){
          const authUser = context.authenticatedUser;
          context.data.deleteCourse(idFromUrl, authUser.emailAddress, authUser.password)
        .then( errors => {
          if (errors.length) {
            console.log(errors);
          } else {
            props.history.push('/');    
          }
        })
        .catch((err) => {
          props.history.push('/error');
          console.log(err);
        });
      } else {
        props.history.push('/Forbidden');
      }
    }
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <NavLink className="button" to={`/courses/${idFromUrl}/update`}>
                  Update Course
                </NavLink>
                <button className="button" href="#" onClick={deleteCourseButtonClick}>
                  Delete Course
                </button>
              </span>
              <NavLink className="button button-secondary" to="/">
                Return to List
              </NavLink>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">
                {title
                  ? title
                  : "loading"}
              </h3>
              {authUser
                  ? <p>{`by ${author.firstName} ${author.lastName}`}</p>
                  : <p>Login to find out who created this course</p>}
            </div>
            <div className="course--description">
              {description
                ? <ReactMarkdown source={description} />
                : "loading"}
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default CourseDetail;