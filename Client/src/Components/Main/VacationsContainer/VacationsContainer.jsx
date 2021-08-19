import React, { useEffect } from 'react';
import './VacationsContainer.css';
import VacationCard from '../VacationCard/VacationCard';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { saveVacations } from '../../redux/action';
import { useHistory } from 'react-router-dom';


function VacationContainer() {
    let vacations = useSelector((state) => state.oneReducers.vacations);
    let {token} = useSelector((state) => state.oneReducers.userData);

    const dispatch = useDispatch();
    const history = useHistory();

    const getVacations = async () => {
        try {
            const result = await axios.get('http://localhost:4040/vacations');
            // console.log("result.data", result.data)
            dispatch(saveVacations(result.data));
        } catch (err) {
            console.log("err", err)
        }
    };

    useEffect(() => {
        if (!token) {
            history.push('/login');
        } else {
            getVacations();
        }
    }, []);
    

    return (
        <div className='vacations-container'>
            {vacations?.map((vacation, i) => (<VacationCard key={i} {...vacation} />))}
        </div>
    )
};

export default VacationContainer;
