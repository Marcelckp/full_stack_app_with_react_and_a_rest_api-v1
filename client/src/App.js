import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

//Components
import Header from './components/Header';
import NotFound from './components/NotFound';
import Home from './components/Courses';
import SignIn from './components/UserSignIn';
import SignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import CourseDetails from './components/CourseDetail';
import CourseDelete from './components/DeleteCourse';
import CourseUpdate from './components/UpdateCourse';
import Error from './components/UnhandledError';
import SignOut from './components/UserSignOut';
import UnAuth from './components/Forbidden';

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route path='/signup' render={() => <SignUp />} />
          <Route path='/signin' render={() => <SignIn />} />
          <Route path='/signout' component={SignOut}/>
          <Route path='/unAuthorized' component={UnAuth}/>
          <Route path='/courses/:id' render={(props) => <CourseDetails {...props} />} />
          <PrivateRoute path='/course/create' component={CreateCourse} />
          <PrivateRoute path='/course/:id/update' component={CourseUpdate} />
          <PrivateRoute path='/course/:id/delete' component={CourseDelete} />
          <Route path='/error' component={Error}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
