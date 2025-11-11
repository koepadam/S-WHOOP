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
  

  let startDate, endDate;

  if (selectedMonth) {
    startDate = new Date(`${selectedMonth}-01`);
    endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
  } else {
    endDate = new Date(); // default to now

    if (range === '1m') {
      startDate = new Date(endDate);
      startDate.setMonth(endDate.getMonth() - 1);
    } else if (range === '3m') {
      startDate = new Date(endDate);
      startDate.setMonth(endDate.getMonth() - 3);
    } else if (range === '6m') {
      startDate = new Date(endDate);
      startDate.setMonth(endDate.getMonth() - 6);
    } else if (range === '1y') {
      startDate = new Date(endDate.getFullYear(), 0, 1);
    } else if (range === '2y') {
      startDate = new Date(endDate.getFullYear() - 1, 0, 1);
    } else if (range === '5y') {
      startDate = new Date(endDate.getFullYear() - 4, 0, 1);
    }
  }

  // TODO

  const filtered = data.filter((row) => {
    const raw = row['Cycle start time'];
    const score = row['Recovery score %'];
    if (!raw || !score) return false;
    const date = new Date(raw.trim());
    return date >= startDate && date <= endDate;
  });

  const dates = filtered.map((row) => {
    const date = new Date(row['Cycle start time'].trim());
    return date.toLocaleDateString('en-GB'); // dd/mm/yyyy
  });

  const scores = filtered.map((row) => Number(row['Recovery score %']) || 0);
  const sleepScores = filtered.map(
    (row) => Number(row['Sleep performance %']) || 0
  );
  const hrv = filtered.map(
    (row) => Number(row['Heart rate variability (ms)']) || 0
  );
  const rhr = filtered.map(
    (row) => Number(row['Resting heart rate (bpm)']) || 0
  );
  const consistency = filtered.map(
    (row) => Number(row['Sleep consistency %']) || 0
  );

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

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Recovery Score Over Time' },
      tooltip: {
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
        title: { display: true, text: '%' },
      },
      y2: {
        beginAtZero: false,
        position: 'right',
        title: { display: true, text: 'Resting Heart Rate (bpm)' },
        ticks: {
          stepSize: 5,
          callback: (val) => `${val} bpm`,
        },
        grid: { drawOnChartArea: false },
      },

      x: {
        title: { display: true, text: 'Date' },
      },
    },
  };

  const ranges = ['1m', '3m', '6m', '1y', '2y', '5y'];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Recovery Trends</h2>

      <div className="flex flex-wrap gap-3 mb-8">
        <input
          type="month"
          value={selectedMonth || ''}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 border rounded"
        />

        {ranges.map((label) => (
          <button
            key={label}
            onClick={() => {
              setRange(label);
              setSelectedMonth(null); //  reset month
            }}
            className={`px-5 py-1 rounded ${
              range === label
                ? 'bg-green-500 text-white'
                : 'bg-green-100 hover:bg-green-200'
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
