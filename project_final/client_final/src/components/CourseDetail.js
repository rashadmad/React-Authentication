import React from 'react';

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
  deleteThisCourse() {
    fetch(`http://localhost:5000/api/courses/${this.courseId}`, {
      method: "DELETE",
      credentials: "same-origin",
      redirect: "follow",
      agent: null,
      headers: {
        "Content-Type": "text/plain",
        Authorization: "Basic " + btoa("gino@coolcats.com:password"),
      },
      timeout: 5000,
    })
      .then(res => res.json())
      .then(courses => this.setState({courses}, () => console.log('courses fetched...',courses)))
  }

  populateThisCourse() {
    fetch(`http://localhost:5000/api/courses/${this.courseId}`, {
      method: 'GET',
      credentials: 'same-origin',
      redirect: 'follow',
      agent: null,
      headers: {
          "Content-Type": "text/plain",
          'Authorization': 'Basic ' + btoa('gino@coolcats.com:password'),
      },
      timeout: 5000
    })
      .then(res => res.json())
      .then(selectedCourse => this.setState({selectedCourse}, () => console.log('courses fetched...',selectedCourse)))
  }

  componentDidMount() {
    this.courseId = this.props.match.params.id;
    this.populateThisCourse()
  }

  render() {
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
                  <h3>hi hours</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>1/2 x 3/4 inch parting strip</li>
                    <li>1 x 2 common pine</li>
                    <li>1 x 4 common pine</li>
                    <li>1 x 10 common pine</li>
                    <li>1/4 inch thick lauan plywood</li>
                    <li>Finishing Nails</li>
                    <li>Sandpaper</li>
                    <li>Wood Glue</li>
                    <li>Wood Filler</li>
                    <li>Minwax Oil Based Polyurethane</li>
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