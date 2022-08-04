import {Outlet, Navigate} from 'react-router-dom'


export default function PrivateRoutes() {
    let userEmail = localStorage.getItem('email') == null ? false : true
  return (!userEmail ? <Navigate to="/"/> : <Outlet/> )
}
