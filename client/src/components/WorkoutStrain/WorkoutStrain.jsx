import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function WorkoutStrain({ data }) {
  const [range, setRange] = useState('1y');

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
  } else {
    startDate = new Date(now.getFullYear(), 0, 1);
  }

  const filtered = data.filter((row) => {
    const raw = row['Workout start time'];
    if (!raw) return false;
    const date = new Date(raw);
    return date >= startDate && date <= now;
  });

  const calorieBins = [0, 200, 400, 600, 800, Infinity];
  const labels = ['<200 Calories', '200-399 Calories', '400-599 Calories', '600-799 Calories', '800+ Calories'];
  const counts = new Array(labels.length).fill(0);

  filtered.forEach((row) => {
    const cal = Number(row['Energy burned (cal)']);
    const index = calorieBins.findIndex((bin, i) => cal >= bin && cal < calorieBins[i + 1]);
    if (index !== -1) counts[index]++;
  });

  const total = counts.reduce((sum, val) => sum + val, 0);

  const chartData = {
    labels: labels.map((label, i) => `${label} (${((counts[i] / total) * 100).toFixed(1)}%)`),
    datasets: [
      {
        data: counts,
        backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
    cutout: '60%',
  };

  const ranges = ['1m', '3m', '6m', '1y', '2y', '5y'];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Workout Strain</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {ranges.map((label) => (
          <button
            key={label}
            onClick={() => setRange(label)}
            className={`px-3 py-1 rounded ${
              range === label
                ? 'bg-red-500 text-white'
                : 'bg-red-100 hover:bg-red-200'
            }`}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-600 mb-2">
        Total Workouts: {total}
      </p>

      <div className="w-[600px] h-[600px] mx-auto">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
