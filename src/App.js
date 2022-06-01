import logo from './logo.svg';
import './App.css';
import PublicRoute from './route/PublicRoute'
import PrivateRoute from './route/PrivateRoute'
import Signup from './pages/auth/SignUp'
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import RoomDetail from './pages/room/RoomDetail';
import SimpleChat from "./pages/chat/SimpleChat";

import HouseRegister from './pages/room/HouseRegister'
import RoomRegister from './pages/room/RoomRegister';
import BedLocationTest from './pages/room/BedLocationTest';
import { RecoilRoot } from 'recoil'

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export const sockJS = new SockJS("http://localhost:8080/web-socket");
export const stompClient = Stomp.over(sockJS);

function App() {

  return (
    <>
      <RecoilRoot>
        <PublicRoute component={Signup} path="/signup" />
        <PublicRoute component={Login} path="/login" exact />
        <PublicRoute component={HouseRegister} path="/house/register" />
        <PublicRoute component={RoomRegister} path="/house/:houseId/room/register" />
        <PublicRoute component={BedLocationTest} path="/bed" />

        <PrivateRoute component={RoomDetail} path="/room/:roomId" exact />
        <PrivateRoute component={Logout} path="/logout" exact />
        {/* <PrivateRoute component={SimpleChat} path="/chat/private/:roomId" exact /> */}
        <PrivateRoute component={SimpleChat} path="/chat/:type/:roomId" exact />

      </RecoilRoot>

    </>
  );
}

export default App;
