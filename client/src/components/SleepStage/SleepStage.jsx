import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function SleepStage({ data }) {
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
    startDate.setDate(now.getDate() - 30);
  } else if (range === '3m') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 90);
  } else if (range === '6m') {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 180);
  } else if (range === '1y') {
    startDate = new Date(now.getFullYear(), 0, 1);
  }

  const cutoff = new Date('2025-01-01');

  const filtered = data.filter((row) => {
    const raw = row['Cycle start time'];
    if (!raw) return false;
    const date = new Date(raw);
    return date >= cutoff && date >= startDate && date <= now;
  });

  const dates = filtered.map((row) => {
    const date = new Date(row['Cycle start time']);
    return date.toLocaleDateString('en-GB').replace(/\//g, '-');
  });

  const light = filtered.map((row) => row['Light sleep duration (min)'] || 0);
  const deep = filtered.map((row) => row['Deep (SWS) duration (min)'] || 0);
  const rem = filtered.map((row) => row['REM duration (min)'] || 0);
  const awake = filtered.map((row) => row['Awake duration (min)'] || 0);
  const asleepDurations = filtered.map(
    (row) => row['Asleep duration (min)'] || 0
  );

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Light',
        data: light,
        backgroundColor: '#a5b4fc',
        stack: 'sleep',
      },
      {
        label: 'Deep (SWS)',
        data: deep,
        backgroundColor: '#6366f1',
        stack: 'sleep',
      },
      {
        label: 'REM',
        data: rem,
        backgroundColor: '#4ade80',
        stack: 'sleep',
      },
      {
        label: 'Awake',
        data: awake,
        backgroundColor: '#f87171',
        stack: 'sleep',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Sleep Stage Breakdown' },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${tooltipItem.dataset.label}: ${formatMinutes(value)}`;
          },
          afterBody: function (tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            const duration = asleepDurations[index];
            return `Total sleep: ${formatMinutes(duration)}`;
          },
        },
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  const ranges = ['1m', '3m', '6m', '1y'];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">🧠 Sleep Architecture</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {ranges.map((label) => (
          <button
            key={label}
            onClick={() => setRange(label)}
            className={`px-3 py-1 rounded ${
              range === label
                ? 'bg-indigo-500 text-white'
                : 'bg-indigo-100 hover:bg-indigo-200'
            }`}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}
