import React, {useEffect} from 'react';

/*
  This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. 
  The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. 
  This component also renders an "Update Course" button for navigating to the "Update Course" screen.
*/

export default class CourseDetail extends React.PureComponent {
  constructor() { 
    super();
    this.deleteThisCourse = this.deleteThisCourse.bind(this);
    this.state = {
      selectedCourse: [],
    };
    this.courseId = null;
  }


  componentDidMount() {
    this.courseId = this.props.match.params.id;
    this.populateThisCourse()
  }

  render() {
    const materialsList = this.state.selectedCourse.materialsNeeded;
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <a className="button" href={`/courses/${this.courseId}/update`}>
                  Update Course
                </a>
                <a className="button" href="/" onClick={this.deleteThisCourse}>
                  Delete Course
                </a>
              </span>
              <a className="button button-secondary" href="/">
                Return to List
              </a>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">
                {this.state.selectedCourse
                  ? this.state.selectedCourse.title
                  : "loading"}
              </h3>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              {this.state.selectedCourse
                ? this.state.selectedCourse.description
                : "loading"}
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.selectedCourse.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>Material</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}