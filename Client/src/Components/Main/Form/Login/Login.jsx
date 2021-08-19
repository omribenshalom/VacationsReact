import React, { useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from '../../../redux/action';


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const history = useHistory();
    const dispatch = useDispatch();

    // check if after refresh has userData
    let userDataFromRedux = useSelector((state) => state.oneReducers.userData);
    useEffect(() => {
        // console.log("userDataFromRedux - ", userDataFromRedux);
        if (userDataFromRedux.length === 0) {
            let userData = JSON.parse(sessionStorage.getItem('userData'));
            if (userData) {
                dispatch(saveUserData(userData));
                initToken(userData.token);
                history.push('/home');
            }
        };
    }, []);


    let userData;
    const submit = async (userDetails) => {
        try {
            const result = await axios.post('http://localhost:4040/users/login', userDetails);
            userData = result.data;
            // console.log('userData - ', userData)
            initToken(userData.token);
            sessionStorage.setItem('userData', JSON.stringify(userData));
            dispatch(saveUserData(userData));
            history.push('/home');
        } catch (err) {
            let errorFromServer = err.response.data.error;
            console.log("err.response.data.error - ", err.response.data.error);
            alert(errorFromServer);
        };
    };

    const initToken = (token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("axios autorization - " , axios.defaults.headers.common['Authorization'])
    };


    return (
        <div className="login-container">
            <p>Login form.</p>
            <br />
            <form id='registerForm' onSubmit={handleSubmit(submit)}>
                <input type='email' placeholder="e-mail.." {...register("email", { required: true })} />
                {errors.email && <span> field is required. </span>}
                {/* {errors.email && <span> field is required. </span>} */}
                <br />
                <input type='password' placeholder="password.." {...register("password", {
                    required: true, minLength: 4,
                    maxLength: 12
                })} />
                {errors.password?.type === "required" && <span> field is required. </span>}
                {errors.password?.type === "minLength" && <span> password is too short. </span>}
                {errors.password?.type === "maxLength" && <span> password is too long. </span>}
                <br />
                <input className='button' type="submit" />
            </form>
            <br />
            <h5>Not Registered ? </h5>
            <a href="/register">Register.</a>
        </div>
    )
}

export default Login;