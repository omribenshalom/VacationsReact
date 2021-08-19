import React from 'react';
import './VacationsChart.css';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { vacationsUpdate } from '../../redux/action';

function VacationsChart() {
    let vacations = useSelector((state) => state.oneReducers.vacations);

    let data = {
        labels: [],
        datasets: [
          {
            label: '# Of Followers',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      
      vacations.map((vacation)=>{
        if (vacation.numOfFollowers > 0){
          data.labels.push(vacation.destination);
          data.datasets[0].data.push(vacation.numOfFollowers);
        }
    });

    return (
        <div className="chart-container">
            <h2>Most Wanted Vacations!</h2>
            <Bar className='chart' data={data} options={options} />
        </div>
    )
}

export default VacationsChart
