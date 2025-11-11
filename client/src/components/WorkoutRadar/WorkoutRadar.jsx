import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function WorkoutRadar({ data }) {
  const zoneKeys = [
    'HR Zone 1 %',
    'HR Zone 2 %',
    'HR Zone 3 %',
    'HR Zone 4 %',
    'HR Zone 5 %',
  ];

  const zoneSums = new Array(5).fill(0);
  let count = 0;

  data.forEach((row) => {
    if (zoneKeys.every((key) => key in row)) {
      zoneKeys.forEach((key, i) => {
        zoneSums[i] += Number(row[key]);
      });
      count++;
    }
  });

  const averages = zoneSums.map((sum) => (count ? sum / count : 0));

  const chartData = {
    labels: ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'],
    datasets: [
      {
        label: 'Avg HR Zone %',
        data: averages,
        backgroundColor: 'rgba(96, 165, 250, 0.2)', 
        borderColor: '#60a5fa',
        pointBackgroundColor: '#60a5fa',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 40,
        ticks: {
          stepSize: 20,
          callback: (val) => `${val}%`,
        },
      },
    },
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Average HR Zone Profile',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `Avg HR Zone: ${Math.round(value)}%`;
          },
        },
      },
    },
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">HR Zone Radar</h2>
      <Radar data={chartData} options={options} />
    </div>
  );
}
