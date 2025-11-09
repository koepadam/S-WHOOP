import { useEffect } from 'react';

// importing charting
import SleepChart from '../SleepChart/SleepChart';
import SleepStage from '../SleepStage/SleepStage';

export default function Dashboard({ parsedData }) {
  const sleepData = parsedData['sleeps.csv'] || [];
  const workoutData = parsedData['workouts.csv'] || [];
  const cycleData = parsedData['physiological_cycles.csv'] || [];

  useEffect(() => {
    console.log('full sleeps data:', parsedData['sleeps.csv']);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📊 SWHOOP Dashboard</h1>
      <SleepChart data={sleepData} />
      <SleepStage data={sleepData} />
    </div>
  );
}
