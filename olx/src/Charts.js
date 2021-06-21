import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import pattern from "patternomaly"

export function NegotiableChart(props) {
    const { nego } = props;
    const data = {
      labels: ["Negotiable", "No negotiable"],
      datasets: [
        {
          data: [nego.AdNegotaible, nego.AdNoNegotaible],
          backgroundColor: [
              pattern.draw('circle', "#" + Math.floor(Math.random()*16777215).toString(16)),
              pattern.draw('triangle', "#" + Math.floor(Math.random()*16777215).toString(16))
          ]
        },
      ],
    };
    return <Doughnut width={300} height={300} data={data} ></Doughnut>;
}

export function CategoriesChart(props) {
  const { categories } = props;
  const shapes = ['square', 'circle', 'diamond', 'triangle']
  const data = {
    labels: categories.map((cat) => cat.SubcategoryName),
    datasets: [
      {
        data: categories.map((cat) => cat.Count),
        backgroundColor: [
            pattern.draw('square', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('circle', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('diamond', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('triangle', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('square', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('circle', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('diamond', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('triangle', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('square', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('circle', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('diamond', "#" + Math.floor(Math.random()*16777215).toString(16)),
            pattern.draw('triangle', "#" + Math.floor(Math.random()*16777215).toString(16))
        ]
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
    legend: {
      display: false,
    },
  };
  return <Bar width={450} height={350} data={data} options={options}></Bar>;
}
