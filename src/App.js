import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { getToken } from './api/AuthAPI'
import PublicRoute from './route/PublicRoute'
import PrivateRoute from './route/PrivateRoute'
import Signup from './pages/auth/SignUp'
import { Routes } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

function App() {

  // useEffect(() => {
  //   getToken({ "email": "a@a.com", "password": "123" }).then(res => {
  //     console.log(res);
  //   });
  // });

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <PublicRoute component={Signup} path="/signup" />
    </>
  );
}

export default App;
