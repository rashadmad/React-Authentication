import React, {useState} from 'react';

/*
    This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. 
    The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. 
    This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
*/

const CreateCourse = () => {

  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [estimatedTime, setEstimatedTime] = useState();
  const [materialsNeeded, setMaterialsNeeded] = useState();

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

  // const populateCourses = () => {
  //   console.log("populate courses")
  // }

    return (
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
            <form onSubmit={handleSubmit}>
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={handleChange}></input></div> 
                        <p>By Joe Smith</p>
                    </div>
                    <div className="course--description">
                        <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={handleChange}></textarea></div>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={handleChange}></input></div>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={handleChange}></textarea></div>
                        </li>
                        </ul>
                    </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleSubmit}>Cancel</button></div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CreateCourse;