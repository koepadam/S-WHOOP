import { useState } from 'react';
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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function WorkoutHeatmap({ data }) {
  const [metric, setMetric] = useState('count');

  const dayLabels = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const counts = new Array(7).fill(0);
  const strainSums = new Array(7).fill(0);
  const calorieSums = new Array(7).fill(0);

  data.forEach((row) => {
    const raw = row['Workout start time'];
    if (!raw) return;
    const date = new Date(raw);
    const day = date.getDay();
    counts[day]++;
    strainSums[day] += Number(row['Activity Strain']) || 0;
    calorieSums[day] += Number(row['Energy burned (cal)']) || 0;
  });

  const values =
    metric === 'count'
      ? counts
      : metric === 'strain'
      ? strainSums.map((sum, i) => (counts[i] ? sum / counts[i] : 0))
      : calorieSums.map((sum, i) => (counts[i] ? sum / counts[i] : 0));

  const chartData = {
    labels: dayLabels,
    datasets: [
      {
        label:
          metric === 'count'
            ? 'Workout Count'
            : metric === 'strain'
            ? 'Avg Strain'
            : 'Avg Calories',
        data: values,
        backgroundColor: '#f87171',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#e5e7eb',
        },
      },
      title: {
        display: true,
        text: 'Workout Frequency by Day of Week',
        color: '#e5e7eb',
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#f3f4f6',
        callbacks: {
          label: function (context) {
            const val = context.raw;
            if (metric === 'count') return `Workouts: ${val}`;
            if (metric === 'strain') return `Avg Strain: ${val.toFixed(1)}`;
            return `Avg Calories: ${val.toFixed(0)} Calories`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#d1d5db' },
        grid: { color: '#374151' },
        title: {
          display: true,
          text:
            metric === 'count'
              ? 'Workout Count'
              : metric === 'strain'
              ? 'Avg Strain'
              : 'Avg Calories',
          color: '#d1d5db',
        },
      },
      y: {
        ticks: { color: '#d1d5db' },
        grid: { color: '#374151' },
      },
    },
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">
        Workout Heatmap
      </h2>

      <div className="flex gap-2 mb-4">
        {['count', 'strain', 'calories'].map((label) => (
          <button
            key={label}
            onClick={() => setMetric(label)}
            className={`px-3 py-1 rounded transition-colors ${
              metric === label
                ? 'bg-red-500 text-white ring-2 ring-red-300'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            {label === 'count'
              ? 'Frequency'
              : label === 'strain'
              ? 'Avg Strain'
              : 'Avg Calories'}
          </button>
        ))}
      </div>

      <Bar data={chartData} options={options} />
    </div>
  );
}
