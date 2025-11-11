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

export default function RecoveryTrend({ data }) {
  const [range, setRange] = useState('1y');
  const [selectedMonth, setSelectedMonth] = useState(null);

  // getting start date on range
  function getStartDate(range) {
    const now = new Date();
    const start = new Date(now);

    switch (range) {
      case '1m':
        start.setMonth(now.getMonth() - 1);
        break;
      case '3m':
        start.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        start.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        return new Date(now.getFullYear(), 0, 1);
      case '2y':
        return new Date(now.getFullYear() - 1, 0, 1);
      case '5y':
        return new Date(now.getFullYear() - 4, 0, 1);
      default:
        return start;
    }
    return start;
  }

  let startDate, endDate;

  //manual month selection
  if (selectedMonth) {
    startDate = new Date(`${selectedMonth}-01`);
    endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
  } else {
    endDate = new Date();
    startDate = getStartDate(range);
  }

  const filtered = data.filter((row) => {
    const raw = row['Cycle start time'];
    const score = row['Recovery score %'];
    if (!raw || !score) return false;
    const date = new Date(raw.trim());
    return date >= startDate && date <= endDate;
  });

  
  const dates = filtered.map((row) =>
    new Date(row['Cycle start time'].trim()).toLocaleDateString('en-GB')
  );
  const scores = filtered.map((row) => Number(row['Recovery score %']) || 0);
  const sleepScores = filtered.map((row) => Number(row['Sleep performance %']) || 0);
  const hrv = filtered.map((row) => Number(row['Heart rate variability (ms)']) || 0);
  const rhr = filtered.map((row) => Number(row['Resting heart rate (bpm)']) || 0);
  const consistency = filtered.map((row) => Number(row['Sleep consistency %']) || 0);

  // ✅ Chart data
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Recovery Score (%)',
        data: scores,
        borderColor: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
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
        label: 'Resting Heart Rate (bpm)',
        data: rhr,
        borderColor: '#f87171',
        backgroundColor: 'rgba(248,113,113,0.2)',
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
        yAxisID: 'y2',
      },
    ],
  };

  // ✅ Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e5e7eb',
        },
      },
      title: {
        display: true,
        text: 'Recovery Score Over Time',
        color: '#e5e7eb',
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#f3f4f6',
        callbacks: {
          label: () => '',
          afterBody: function (tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            return [
              `Recovery Score: ${Math.round(scores[index])}%`,
              `Sleep Performance: ${Math.round(sleepScores[index])}%`,
              `Consistency: ${Math.round(consistency[index])}%`,
              `HRV: ${Math.round(hrv[index])} ms`,
              `RHR: ${Math.round(rhr[index])} bpm`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#d1d5db' },
        grid: { color: '#374151' },
        title: {
          display: true,
          text: '%',
          color: '#d1d5db',
        },
      },
      y2: {
        beginAtZero: false,
        position: 'right',
        ticks: {
          stepSize: 5,
          color: '#d1d5db',
          callback: (val) => `${val} bpm`,
        },
        grid: { drawOnChartArea: false },
        title: {
          display: true,
          text: 'Resting Heart Rate (bpm)',
          color: '#d1d5db',
        },
      },
      x: {
        ticks: { color: '#d1d5db' },
        grid: { color: '#374151' },
        title: {
          display: true,
          text: 'Date',
          color: '#d1d5db',
        },
      },
    },
  };

  const ranges = ['1m', '3m', '6m', '1y', '2y', '5y'];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Recovery Trends</h2>

      {/* ✅ Range and month selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        <input
          type="month"
          value={selectedMonth || ''}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-600"
        />

        {ranges.map((label) => (
          <button
            key={label}
            onClick={() => {
              setRange(label);
              setSelectedMonth(null); // clear manual month selection
            }}
            className={`px-5 py-1 rounded transition-colors ${
              range === label
                ? 'bg-green-500 text-white ring-2 ring-green-300'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
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