import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Components
import Header from './components/Header';
import NotFound from './components/NotFound';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateCourse from './components/Create-Course';


function App() {
  const [api, setApi] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => {
        const data = res.data;
        setApi(data);
      }).catch(err => {
        console.log(err);
      })
  },[]);

  console.log(api)
  return (
    <BrowserRouter>
      <div>
        <Header />
        {/* <h1>Welcome</h1> */}
        <p>{ api.message }</p>
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route path='/signup' render={() => <SignUp />} />
          <Route path='/signin' render={() => <SignIn />} />
          <Route path='/create-course' render={() => <CreateCourse />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
