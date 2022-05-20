import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { getToken } from './api/AuthAPI'
import PublicRoute from './route/PublicRoute'
import PrivateRoute from './route/PrivateRoute'
import MainPage from './pages/Home/MainPage'
import Signup from './pages/auth/SignUp'
import HouseRegister from './pages/room/HouseRegister'
import RoomRegister from './pages/room/RoomRegister';
import BedLocationTest from './pages/room/BedLocationTest';
import ShowRoomList from './pages/room/ShowRoomList';
import { Routes } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil'

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
    <RecoilRoot>
      <PublicRoute component={MainPage} path="/" />
      <PublicRoute component={Signup} path="/signup" />
      <PublicRoute component={HouseRegister} path="/house/register" />
      <PublicRoute component={RoomRegister} path="/house/:houseId/room/register" />
      <PublicRoute component={BedLocationTest} path="/bed" />
      <PublicRoute component={ShowRoomList} path="/house/:houseId/roomList" />
    </RecoilRoot>
  );
}

export default App;
