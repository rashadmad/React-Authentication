import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Forbidden from './components/Forbidden';
import Header from './components/Header';
//import Public from './components/Public';
import Courses from './components/Courses'
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
//import Authenticated from './components/Authenticated';
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'

import withContext from './Context';
//import PrivateRoute from './PrivateRoute';


const CreateCourseWithContext = withContext(CreateCourse);
const HeaderWithContext = withContext(Header);
//const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={Courses} />
          {/* <PrivateRoute path="/authenticated" component={AuthWithContext} /> */}
          <Route path="/courses/create" component={CreateCourseWithContext} />
          <Route path="/courses" component={Courses} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/courses/signout" component={UserSignOut} />
          {/* <Route path="/courses/:id/update" component={UpdateCourse} /> */}
          <Route path="/courses/:id" component={CourseDetail} />
          <Route component={NotFound} />
          <Route component={Forbidden} />
        </Switch>
      </div>
    </Router>
);
