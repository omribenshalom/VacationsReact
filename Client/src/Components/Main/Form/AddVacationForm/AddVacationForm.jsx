import React from 'react';
import './AddVacationForm.css';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import axios from 'axios';


function AddVacationForm() {

    const { register, handleSubmit, formState: {errors}} = useForm();
    
    let history = useHistory();

    const submit = async (data) => {
        try {
            await axios.post('http://localhost:4040/vacations', data)
            console.log("new vacation registered succefully.")
            history.push('/home');
        } catch (err) {
            console.log("err", err)
        };
    };


    return (
        <div className="add-vacation-form-container">
            <p>Add Vacation form.</p>
            <form id='addVacationForm' onSubmit={handleSubmit(submit)}>
                
                <input placeholder="destination.." {...register("destination" , {required:true})}/>
                {errors.destination && <span> field is required. </span>}
                <br/>
                
                <input placeholder="description.." {...register("description" , {required:true})}/>
                {errors.description && <span> field is required. </span>}
                <br/>

                <input type="date" placeholder="start date.." {...register("startDate" , {required:true})}/>
                {errors.startDate && <span> field is required. </span>}
                <br/>
                
                <input type="date" placeholder="end date.." {...register("endDate" , {required:true})}/>
                {errors.endDate && <span> field is required. </span>}
                <br/>

                <input placeholder="image link.." {...register("image" , {required:true})}/>
                {errors.image && "required" && <span> field is required. </span>}
                <br/>
                
                <input placeholder="price $.." {...register("price" , {required:true})}/>
                {errors.price && "required" && <span> field is required. </span>}
                <br/>
                <br/>
                <input className='button-style' type="submit" />
            </form>
        </div>
    );
};

export default AddVacationForm ;
