import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/* 
    UserSignUp - This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. 
    The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. 
    This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses). 
*/

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last name" />
                <input 
                  id="email" 
                  name="email" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
      name,
      username,
      password,
    } = this.state;

    // Create user
    const user = {
      name,
      username,
      password,
    };

    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(username, password)
            .then(() => {
              this.props.history.push('/authenticated');    
            });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  
  }

  cancel = () => {
   this.props.history.push('/');
  }
}
