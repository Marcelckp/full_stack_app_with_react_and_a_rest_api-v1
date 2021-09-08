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
import Error from './components/Error'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route path='/signup' render={() => <SignUp />} />
          <Route path='/signin' render={() => <SignIn />} />
          <Route path='/course-details/:id' render={(props) => <CourseDetails {...props} />} />
          <PrivateRoute path='/create-course' render={() => <CreateCourse />} />
          <PrivateRoute path='/course-update/:id' render={(props) => <CourseUpdate {...props} />} />
          <PrivateRoute path='/course-delete/:id' render={(props) => <CourseDelete {...props} />} />
          <Route path='/error' component={Error}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
