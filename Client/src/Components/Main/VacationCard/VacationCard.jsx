import React, { useState } from 'react';
import './VacationCard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { vacationsUpdate } from '../../redux/action';
import { useForm } from 'react-hook-form';

// icons on card
import { IconContext } from 'react-icons';
import { FiEdit2, FiDelete } from "react-icons/fi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";


function VacationCard(props) {

    const isAdmin = useSelector((state) => state.oneReducers.userData.isAdmin);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();

    const [editVacation, setEditVacation] = useState(false);
    const onEdit = () => setEditVacation(!editVacation);

    let vacations = useSelector((state) => state.oneReducers.vacations);
    let vacationsCopy = [...vacations];
    let currentVacationIndex = vacationsCopy.findIndex(({ vacationId }) => vacationId === props.vacationId);

    // for admin
    const submit = async (data) => {
        console.log("form data - ", data)
        try {
            await axios.put('http://localhost:4040/vacations', data);
            console.log("update vacation succeed.");
            vacationsCopy[currentVacationIndex].startDate = data.startDate;
            vacationsCopy[currentVacationIndex].endDate = data.endDate;
            vacationsCopy[currentVacationIndex].price = data.price;
            dispatch(vacationsUpdate(vacationsCopy));
            onEdit();
        } catch (err) {
            console.log("err", err);
        };
    };

    // for admin
    const deleteVacation = async () => {
        if (isAdmin) {
            console.log("delete vacation - ", props.vacationId);
            const paramId = "/" + props.vacationId;
            try {
                await axios.delete('http://localhost:4040/vacations' + paramId);
                vacationsCopy.splice(currentVacationIndex, 1);
                dispatch(vacationsUpdate(vacationsCopy));
            } catch (err) {
                console.log("err", err)
            };
        };
    };

    let isFollowed = props.isUserFollow;
    // for user 
    const followVacation = async (e) => {
        const vacationId = props.vacationId;
        // console.log("vacationId - ", vacationId);
        if (!isFollowed || isFollowed === false) {
            console.log("post new follow");
            await axios.post('http://localhost:4040/follow', { id: vacationId });
            
            vacationsCopy[currentVacationIndex].isUserFollow = true;
            dispatch(vacationsUpdate(vacationsCopy));
        } else if (isFollowed || isFollowed === true) {
            console.log("unfollow.");
            const paramId = "/" + props.vacationId;
            await axios.delete('http://localhost:4040/follow' + paramId);

            vacationsCopy[currentVacationIndex].isUserFollow = false;
            dispatch(vacationsUpdate(vacationsCopy));
        };
    };


    return (
        <IconContext.Provider value={{ color: "#13161a", size: "1.4em" }} >
            <div className='card-container'>
                <div className='card-header'>
                    <h3>{props.destination}</h3>
                </div>
                <img src={props.image} className='image' alt={props.destination} />
                <div className='card-main'>
                    <h6>{props.startDate} --- {props.endDate}</h6>
                    <h6>{props.description}</h6>
                    <h6>{props.price} $</h6>
                    <h6>Followers - {props.numOfFollowers}</h6>
                    <div>
                        {
                            (isAdmin === 1)
                                ? <div className='editForm'>
                                    <FiEdit2 id={props.id} className='btn' type="button" value='edit' onClick={onEdit} />
                                    {editVacation
                                        ?
                                        <form id='editVacationForm' onSubmit={handleSubmit(submit)}>
                                            <FaWindowClose id={props.id} className='btn btn-close' type="button" value='edit' onClick={onEdit} />
                                            <br />
                                            <p>Edit Vacation form. </p>
                                            <br />

                                            <input value={props.destination} {...register("destination", { required: true })} readOnly />
                                            {errors.destination && <span> field is required. </span>}
                                            <br />

                                            <input value={props.description} {...register("description", { required: true })} readOnly />
                                            {errors.description && <span> field is required. </span>}
                                            <br />

                                            <input type="date" placeholder={props.startDate} {...register("startDate", { required: true })} />
                                            {errors.startDate && <span> field is required. </span>}
                                            <br />

                                            <input type="date" placeholder={props.endDate} {...register("endDate", { required: true })} />
                                            {errors.endDate && <span> field is required. </span>}
                                            <br />

                                            <input value={props.image} {...register("image", { required: true })} readOnly />
                                            {errors.image && "required" && <span> field is required. </span>}
                                            <br />

                                            <input placeholder={props.price} {...register("price", { required: true })} />
                                            {errors.price && "required" && <span> field is required. </span>}
                                            <br />

                                            <br />
                                            <input className='button-style btn' type="submit" />
                                        </form>

                                        :
                                        null
                                    }
                                    <FiDelete id={props.id} className='btn' type="button" value='delete' onClick={() => {
                                        if (window.confirm('Are you sur you want to delete this vacation ?')) { deleteVacation() };
                                    }} />
                                </div>

                                :
                                (isFollowed)
                                    ? <AiFillLike id="1" name="follow" className='btn' onClick={followVacation} />
                                    : <AiOutlineLike id="0" name="unfollow" className='btn' onClick={followVacation} />
                        }
                    </div>
                </div>
            </div>
        </IconContext.Provider>
    )
};

export default VacationCard;
