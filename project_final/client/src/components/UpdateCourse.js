import React, {useEffect, useState} from 'react';
import Form from './Form';

/*
   This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. 
   The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. 
   This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
*/

const UpdateCourses = (props) => {

    //state
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setError] = useState([]);
    const [author, setAuthor] = useState("");
    const authUser = props.context.authenticatedUser;

    
    const idFromUrl = props.match.params.id
    const { context } = props;

    //add the currently selected courses to state
    useEffect(() => {
      context.data.getCourse(idFromUrl)
      .then((courseToUpdateData) => {
        setTitle(courseToUpdateData.title);
        setDescription(courseToUpdateData.description);
        setEstimatedTime(courseToUpdateData.estimatedTime);
        setMaterialsNeeded(courseToUpdateData.materialsNeeded);
        setAuthor(courseToUpdateData.User);
      });
    }, [idFromUrl,context]);
    

  
    const handleChange = (event) => {
      switch(event.target.name) {
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
  
    const handleSubmit = () => {
      
      const { context } = props;
  
      const course = {
        userId: authUser.id,
        title,
        description,
        estimatedTime,
        materialsNeeded
      } 
  
      context.data.updateCourses(course, props.match.params.id, props.context.authenticatedUser.emailAddress, props.context.authenticatedUser.password) 
      .then( errors => {
        
        if (errors.length) {
          setError( errors )
          console.log(errors);
        } else {
          debugger
          props.history.push('/');    
        }
      })
      .catch((err) => {
        props.history.push('/error');
        console.log(err);
      });
    }
  
    //Handle course submit cancellation
    const cancel = () => {
        props.history.push('/') //push root to history stack
    }
  
      return (
       <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <div>
            <Form
            cancel={cancel}
            errors={errors}
            submit={handleSubmit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input 
                        id="title" 
                        name="title" 
                        type="text" 
                        onChange={handleChange} 
                        className="input-title course--title--input" 
                        value={title || ""} />
                    </div>
                    <p>By {author.firstName} {author.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea 
                        id="description" 
                        name="description" 
                        onChange={handleChange} 
                        value={description || ""}
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
                            onChange={handleChange} 
                            className="course--time--input"                              
                            value={estimatedTime || ""}  />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id="materialsNeeded" 
                            name="materialsNeeded"
                            onChange={handleChange} 
                            value={materialsNeeded || ""}
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )} />
              </div>
          </div>
        </div>
      );
  }
  
  export default UpdateCourses;