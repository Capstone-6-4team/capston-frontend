import logo from './logo.svg';
import './App.css';
import PublicRoute from './route/PublicRoute'
import PrivateRoute from './route/PrivateRoute'
import MainPage from './pages/Home/MainPage'
import Signup from './pages/auth/SignUp'
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import RoomDetail from './pages/room/RoomDetail';

import HouseRegister from './pages/room/HouseRegister'
import RoomRegister from './pages/room/RoomRegister';
import BedLocationTest from './pages/room/BedLocationTest';
import ShowRoomList from './pages/room/ShowRoomList';
import AddressTest from './pages/room/AddressTest';

import Evaluation from './pages/evaluation/Evaluation';

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
    <>
      <PrivateRoute component={Logout} path="/logout" exact />

      <PublicRoute component={Signup} path="/signup" exact />
      <PublicRoute component={Login} path="/login" exact />
      <PrivateRoute component={HouseRegister} path="/house/register" />
      <Route component={ShowRoomList} path="/house/:houseId/roomList" />
      <PublicRoute component={AddressTest} path="/address" />
      <RecoilRoot>

        <PrivateRoute component={RoomRegister} path="/house/:houseId/room/register" exact />
        <PublicRoute component={BedLocationTest} path="/bed" />

        <PrivateRoute component={RoomDetail} path="/room/:roomId" exact />
      </RecoilRoot>
      <Route component={MainPage} path="/" exact />

      <Route component={Evaluation} path="/evaluation" exact />

    </>
  );
}

export default App;
