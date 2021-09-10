import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

//Components
import Header from './components/Header';
import NotFound from './components/NotFound';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateCourse from './components/Create-Course';
import CourseDetails from './components/Course-Details';
import CourseDelete from './components/Course-Delete';
import CourseUpdate from './components/Course-Update';
import Error from './components/Error';
import SignOut from './components/SignOut';
import UnAuth from './components/UnAuth';

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
