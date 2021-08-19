import React from 'react'
import './Navbar.css';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserData } from '../redux/action';
import axios from 'axios';


function Navbar() {
    const { isAdmin, token } = useSelector((state) => state.oneReducers.userData);

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(deleteUserData());
        delete axios.defaults.headers.common["Authorization"];
        sessionStorage.removeItem('userData');
        window.location.reload();
    };

    return (
        <div className="navbar-container">
            <h3>lOGO vACA</h3>
            <ul>
                {
                    (isAdmin) ?
                        <div className="navbar-container">
                            <li><NavLink className='navlink' to="/add-vacation" >Add Vacation</NavLink></li>
                            <li><NavLink className='navlink' to="/vacations-chart" >Vacations Chart</NavLink></li>
                            <li><NavLink className='navlink' to="/home" >Home</NavLink></li>
                            <li><NavLink className='navlink' to="/home" onClick={onLogout}>Log-Out</NavLink></li>
                        </div> :
                        (token) ?
                            <div className="navbar-container">
                                <li><NavLink className='navlink' to="/login" onClick={onLogout}>Log-out</NavLink></li>
                                <li><NavLink className='navlink' to="/home" >Home</NavLink></li>
                            </div>
                            :
                            <div className="navbar-container">
                                <li><NavLink className='navlink' to="/register" > Register </NavLink></li>
                                <li><NavLink className='navlink' to="/login" > Login </NavLink></li>
                            </div>
                }
            </ul>
        </div>
    )
}

export default Navbar
