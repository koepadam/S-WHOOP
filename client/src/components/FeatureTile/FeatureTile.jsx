import { useState } from 'react';

export default function FeatureTile({ title, summary, details }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`rounded-xl p-6 cursor-pointer transition-all duration-300 backdrop-blur-sm  ${
        open
          ? 'bg-black/30 border-gray-800'
          : 'bg-black/20 hover:bg-black/30 border-gray-800 hover:border-gray-700'
      }`}
    >
      <div className="flex items-center justify-between space-x-4">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400 italic">{summary}</p>
        </div>
      </div>

      {open && (
        <div className="mt-4 border-t border-gray-800 pt-4">
          <p className="text-sm text-gray-300 leading-relaxed">{details}</p>
        </div>
      )}
    </div>
  );
}
