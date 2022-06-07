import logo from './logo.svg';
import './App.css';
import PublicRoute from './route/PublicRoute'
import PrivateRoute from './route/PrivateRoute'
import MainPage from './pages/Home/MainPage'
import Signup from './pages/auth/SignUp'
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import RoomDetail from './pages/room/RoomDetail';
import SimpleChat from "./pages/chat/SimpleChat";
import Search from "./pages/search/Search"

import HouseRegister from './pages/room/HouseRegister'
import RoomRegister from './pages/room/RoomRegister';
import BedLocationTest from './pages/room/BedLocationTest';
import ShowRoomList from './pages/room/ShowRoomList';
import AddressTest from './pages/room/AddressTest';

import ShowEvaluation from './pages/evaluation/ShowEvaluation';
import RegisterEvaluation from './pages/evaluation/RegisterEvaluation'

import { Routes } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil'

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export const sockJS = new SockJS("http://localhost:8080/web-socket");
export const stompClient = Stomp.over(sockJS);

function App() {

  return (
    <>
      <PrivateRoute component={Logout} path="/logout" exact />

      <PublicRoute component={Signup} path="/signup" exact />
      <PublicRoute component={Login} path="/login" exact />
      <PublicRoute component={AddressTest} path="/address" />
      <PrivateRoute component={Search} path="/search" />

      <RecoilRoot>
        <PrivateRoute component={RoomRegister} path="/house/:houseId/room/register" exact />
        <PrivateRoute component={RoomDetail} path="/room/:roomId" exact />

        <PublicRoute component={BedLocationTest} path="/bed" />
      </RecoilRoot>

      <Route component={MainPage} path="/" exact />
      <Route component={ShowEvaluation} path="/evaluation/:id" exact />
      <Route component={ShowRoomList} path="/house/:houseId/roomList" />

      <PrivateRoute component={SimpleChat} path="/chat/:type/:roomId" exact />
      <PrivateRoute component={HouseRegister} path="/house/register" />
      <PrivateRoute component={RegisterEvaluation} path="/evaluation/:id/register" exact />


    </>
  );
}

export default App;
