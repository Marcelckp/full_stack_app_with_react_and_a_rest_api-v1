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
          <Route path='/forbidden' component={UnAuth}/>
          <PrivateRoute path='/courses/create' component={CreateCourse} />
          <PrivateRoute path='/courses/:id/update' component={CourseUpdate} />
          <PrivateRoute path='/courses/:id/delete' component={CourseDelete} />
          <Route path='/courses/:id' render={(props) => <CourseDetails {...props} />} />
          <Route path='/error' component={Error} />
          <Route path='/notfound' component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
