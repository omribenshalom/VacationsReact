import React from 'react';
import './Register.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    let history = useHistory();

    const submit = async (userDetails) => {
        try {
            await axios.post('http://localhost:4040/users', userDetails);
            history.push('/login');
        } catch (err) {
            let errorFromServer = err.response.data.error;
            console.log("err.response.data.error - ", err.response.data.error);
            alert(errorFromServer);
        };
    };

    return (
        <div className="register-container">
            <p>Register form.</p>
            <br />
            <form id='registerForm' onSubmit={handleSubmit(submit)}>
                <input placeholder="first name.." {...register("firstName", { required: true })} />
                {errors.firstName && <span> field is required. </span>}
                <br />
                <input placeholder="last name.." {...register("lastName", { required: true })} />
                {errors.lastName && <span> field is required. </span>}
                <br />
                <input type='email' placeholder="e-mail.." {...register("email", { required: true })} />
                {errors.email && <span> field is required. </span>}
                <br />
                <input type='password' placeholder="password.." {...register("password", { required: true, minLength: 4, maxLength: 12 })} />
                {errors.password?.type === "required" && <span> field is required. </span>}
                {errors.password?.type === "minLength" && <span> password is too short. </span>}
                {errors.password?.type === "maxLength" && <span> password is too long. </span>}
                <br />
                <input className='button' type="submit" />
            </form>
            <br />
            <h5>Already Registered ? </h5>
            <a href="/login">Log in.</a>
        </div>
    );
};

export default Register;
