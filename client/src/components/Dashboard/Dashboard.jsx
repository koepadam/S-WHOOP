import { useEffect } from 'react';

import SleepChart from '../SleepChart/SleepChart';
import SleepStage from '../SleepStage/SleepStage';
import WorkoutStrain from '../WorkoutStrain/WorkoutStrain';
import WorkoutHeatmap from '../WorkoutHeatmap/WorkoutHeatmap';
import WorkoutRadar from '../WorkoutRadar/WorkoutRadar';
import RecoveryChart from '../RecoveryChart/RecoveryChart';
import FeatureTile from '../FeatureTile/FeatureTile';

export default function Dashboard({ parsedData }) {
  const sleepData = parsedData['sleeps.csv'];
  const workoutData = parsedData['workouts.csv'];
  const cycleData = parsedData['physiological_cycles.csv'];

  useEffect(() => {
    console.log('full sleeps data:', parsedData['sleeps.csv']);
  }, [parsedData]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 min-h-screen pt-24 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-16 px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-6xl font-orbitron font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider drop-shadow-md">
            Dashboard
          </h1>
          <p className="mt-3 text-base text-gray-400 italic">
            Your performance insights, visualized.
          </p>
        </header>

        <section className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl font-semibold text-white">Sleep</h2>
            <p className="text-sm text-gray-400">
              Track your sleep need, understand your sleep stages, & optimize
              your sleep performance.
            </p>
            <FeatureTile
              title="Optimize Your Sleep"
              summary="Learn how WHOOP calculates your sleep need"
              details={`Quality of sleep is just as important as quantity. WHOOP monitors your wake events, efficiency, and respiratory rate to deliver daily recommendations on how to get your best sleep every night.`}
            />
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:ring-2 hover:ring-indigo-500 transition">
            <SleepChart data={sleepData} />
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:ring-2 hover:ring-indigo-500 transition">
            <SleepStage data={sleepData} />
          </div>
        </section>

        <section className="space-y-8">
          <div className="border-l-4 border-red-500 pl-4">
            <h2 className="text-2xl font-semibold text-white">Workout</h2>
            <p className="text-sm text-gray-400">
              Explore your strain and exercises, monitor your training load with
              heart rate zones, and fine-tune your performance.
            </p>
            <FeatureTile
              title="How We Measure Strain"
              summary="Learn how WHOOP facilitates training"
              details={`WHOOP calculates the exertion you put on your body on a scale of 0 to 21. The score measures both cardiovascular and muscular load and can be affected by things like exercise, work, anxiety, running errands, parenting, and more. See strain for every activity or for the whole day.`}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6">
              <WorkoutStrain data={workoutData} />
            </div>
            <div className="w-full md:w-1/2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6">
              <WorkoutRadar data={workoutData} />
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:ring-2 hover:ring-red-500 transition">
            <WorkoutHeatmap data={workoutData} />
          </div>
        </section>

        <section className="space-y-8">
          <div className="border-l-4 border-yellow-500 pl-4">
            <h2 className="text-2xl font-semibold text-white">Recovery</h2>
            <p className="text-sm text-gray-400">
              Monitor your physiological cycles to see how your body adapts to
              strain, illness, sleep & much more.
            </p>
            <FeatureTile
              title="How We Calculate Recovery"
              summary="Learn how WHOOP assesses users day readiness "
              details={`WHOOP calculates your recovery on a scale of 0 to 100% during your sleep, looking at your heart rate variability (HRV), resting heart rate, respiratory rate, SpO2, sleep performance, and skin temperature to see how your body is adapting to physiological and psychological stress. The biggest influence is by far your HRV but it also considers your health, behaviors, stress levels, hydration, and more.`}
            />
          </div>

          <div className="mb-5 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:ring-2 hover:ring-yellow-500 transition">
            <RecoveryChart data={cycleData} />
          </div>
        </section>
      </div>
    </div>
  );
}
