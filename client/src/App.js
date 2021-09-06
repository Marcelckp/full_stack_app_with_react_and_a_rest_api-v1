import React, { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [api, setApi] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => {
        const data = res.data;
        setApi(data)
      })
  },[])

  console.log(api)
  return (
    <div>
      <h1>Welcome</h1>
      <p>{ api.message }</p>
    </div>
  )
}

export default App
