import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function SleepChart({ data }) {
  const [range, setRange] = useState('1y');

  function formatMinutes(mins) {
    const hours = Math.floor(mins / 60);
    const minutes = Math.round(mins % 60);
    return `${hours}h ${minutes}m`;
  }

  const now = new Date();
  let startDate;

  if (range === '1m') {
    startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 1);
  } else if (range === '3m') {
    startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 3);
  } else if (range === '6m') {
    startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 6);
  } else if (range === '1y') {
    startDate = new Date(now.getFullYear(), 0, 1);
  } else if (range === '2y') {
    startDate = new Date(now.getFullYear() - 1, 0, 1);
  } else if (range === '5y') {
    startDate = new Date(now.getFullYear() - 4, 0, 1);
  }

  const filtered = data.filter((row) => {
    const raw = row['Cycle start time'];

    const date = new Date(raw);
    return date >= startDate && date <= now;
  });

  const dates = filtered.map((row) => {
    const date = new Date(row['Cycle start time']);
    return date.toLocaleDateString('en-GB');
  });

  const sleepScores = filtered.map(
    (row) => Number(row['Sleep performance %']) 
  );
  const asleepDurations = filtered.map(
    (row) => Number(row['Asleep duration (min)']) 
  );
  const efficiency = filtered.map(
    (row) => Number(row['Sleep efficiency %']) 
  );
  const consistency = filtered.map(
    (row) => Number(row['Sleep consistency %']) 
  );

  const avgSleepDuration =
    asleepDurations.reduce((sum, val) => sum + val, 0) / asleepDurations.length;

  const avgSleepLine = {
    label: 'Avg Sleep Duration',
    data: new Array(dates.length).fill(avgSleepDuration),
    borderColor: '#8b5cf6',
    borderWidth: 1,
    borderDash: [5, 5],
    pointRadius: 0,
  };

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Sleep Performance (%)',
        data: sleepScores,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.2)',
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'Total Sleep (min)',
        data: asleepDurations,
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74,222,128,0.2)',
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
        yAxisID: 'y2',
      },
      avgSleepLine,
      {
        label: 'Efficiency (%)',
        data: efficiency,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.2)',
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'Consistency (%)',
        data: consistency,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.2)',
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Sleep Metrics Over Time' },
      tooltip: { // ! used AI here for the tooltip information
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.dataset.label;
            const value = tooltipItem.raw;

            if (label === 'Total Sleep (min)') {
              return `${label}: ${formatMinutes(value)}`;
            } else {
              return `${label}: ${value}%`;
            }
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: '%' },
      },
      y2: {
        beginAtZero: true,
        position: 'right',
        title: { display: true, text: 'Sleep Duration' },
        ticks: { 
          stepSize: 60,
          callback: function (value) {
            const hours = Math.floor(value / 60);
            return `${hours}h`;
          },
        },
      },
    },
  };

  const ranges = ['1m', '3m', '6m', '1y', '2y', '5y'];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4"> Sleep Trends</h2>

      <div className="flex flex-wrap gap-3 mb-8">
        {ranges.map((label) => (
          <button
            key={label}
            onClick={() => setRange(label)}
            className={`px-5 py-1 rounded ${
              range === label
                ? 'bg-indigo-500 text-white'
                : 'bg-indigo-100 hover:bg-indigo-200'
            }`}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </div>

      <Line data={chartData} options={options} />
    </div>
  );
}
