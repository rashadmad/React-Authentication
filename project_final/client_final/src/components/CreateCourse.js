import React, {Fragment, useState, useEffect} from 'react';
import Form from './Form';
//import { authenticatedUser } from '../Context';

/*
    This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. 
    The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. 
    This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
*/

const CreateCourse = (props) => {

  //state
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [estimatedTime, setEstimatedTime] = useState();
  const [materialsNeeded, setMaterialsNeeded] = useState();
  const [errors, setError] = useState([]);
  const authUser = props.context.authenticatedUser;

  const handleChange = (event) => {
    switch(event.target.name) {
      case id:
        setId(event.target.value);
        break;
      case 'title':
        setTitle(event.target.value);
        break;
      case 'description':
        setDescription(event.target.value);
        break;
      case 'estimatedTime':
        setEstimatedTime(event.target.value);
        break;
      case 'materialsNeeded':
        setMaterialsNeeded(event.target.value);
        break;
      default:
        console.log(`the event name is ${event.target.name}`);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit button pressed")
  }

  //Handle course submit cancellation
  const cancel = () => {
      this.props.history.push('/') //push root to history stack
  }

  useEffect(() => {
    console.log("use effect activated");
  });

    return (
      console.log(authUser),
     <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  <li>Please provide a value for "Title"</li>
                  <li>Please provide a value for "Description"</li>
                </ul>
              </div>
            </div>
          <Form
          cancel={cancel}
          errors={errors}
          submit={handleSubmit}
          submitButtonText="Create Course"
          elements={() => (
            <Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      value={title}
                      onChange={handleChange} 
                      className="input-title course--title--input" 
                      placeholder="Course title..." />
                  </div>
                  <p>By {authUser.firstName} {authUser.lastName}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea 
                      id="description" 
                      name="description" 
                      value={description}
                      onChange={handleChange} 
                      placeholder="Course description..."
                      className="course--description" />
                  </div> 
                </div>
               </div> 
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input 
                          id="estimatedTime" 
                          name="estimatedTime" 
                          type="text"
                          value={estimatedTime} 
                          onChange={handleChange} 
                          className="course--time--input"                              
                          placeholder="Hours" />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded" 
                          name="materialsNeeded"
                          value={materialsNeeded}
                          onChange={handleChange} 
                          placeholder="List materials..." 
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Fragment>
          )} />
            </div>
        </div>
      </div>
    );
}

export default CreateCourse;