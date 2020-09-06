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
    confirmPassword: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
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
                  id="emailAddress" 
                  name="emailAddress" 
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
                <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />
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

  isPasswordConfirmed = (pass, confPass) => {
    let passwordsMatch = false
    if (pass === confPass) {
      passwordsMatch = true
    } 
    return passwordsMatch
  }

  submit = () => {

    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      confirmPassword,
      password,
    } = this.state;

    //need a gate to check if the confirm password and password fields match 
    if(this.isPasswordConfirmed(password,confirmPassword)){
      //if they do then create a user
      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
      };

      context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
          console.log(errors);
          debugger
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/authenticated');    
            });
        }
      })
      .catch((err) => {
        this.props.history.push('/error');
        console.log(err);
        debugger
      });

    } else {
      //if they don't then send an error that states 
      alert("your passwords do not match.");
    }
  }

  cancel = () => {
   this.props.history.push('/');
  }
}
