'use client';

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { projections } from '@/hardcoded';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Projected Revenue',
    },
  },
};

function Graph() {
  // const projected = require(""); //data here
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
        {
            label: 'Projected Revenues in $',
            data: projections.map((el) => el.projected_amount),
            // borderColor: '',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
    ],
  };

  return (
   
      <div className="">
       
          <Bar data={data} options={options}/>
        
      </div>
   
  )
}

export default Graph;





