import { useEffect } from 'react';

// importing charting
import SleepChart from '../SleepChart/SleepChart';
import SleepStage from '../SleepStage/SleepStage';

import WorkoutStrain from '../WorkoutStrain/WorkoutStrain';
import WorkoutHeatmap from '../WorkoutHeatmap/WorkoutHeatmap';
import WorkoutRadar from '../WorkoutRadar/WorkoutRadar';

import RecoveryChart from '../RecoveryChart/RecoveryChart';

export default function Dashboard({ parsedData }) {
  const sleepData = parsedData['sleeps.csv'];
  const workoutData = parsedData['workouts.csv'];
  const cycleData = parsedData['physiological_cycles.csv'];

  useEffect(() => {
    console.log('full sleeps data:', parsedData['sleeps.csv']);
  });

  return (
    <div className="space-y-10 bg-gray-900 text-gray-100 min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">S-WHOOP Dashboard</h1>
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-6"><SleepChart data={sleepData} /></div>
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-6"><SleepStage data={sleepData} /></div>
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-6"><WorkoutStrain data={workoutData} /></div>
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-6"><WorkoutHeatmap data={workoutData} /></div>
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-6"><WorkoutRadar data={workoutData} /></div>
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-6"><RecoveryChart data={cycleData} /></div>
      

      
      
      
      
    </div>
  );
}
