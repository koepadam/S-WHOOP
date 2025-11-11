import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import ImportForm from './components/InputForm/InputForm';
import Dashboard from './components/Dashboard/Dashboard';

import './App.css';

function App() {
  const [parsedData, setParsedData] = useState({}); 

  const handleFolderSubmit = (files) => {
    files.forEach((file) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedRows = results.data;

          // first 5 rows for check
          console.log(` ${file.name} — First 5 rows:`, parsedRows.slice(0, 5));

          // Saving full  data for charting
          setParsedData((prev) => ({
            ...prev,
            [file.name]: parsedRows,
          }));
        },
        error: (err) => {
          console.error(`❌ Error parsing ${file.name}:`, err);
        },
      });
    });
  };

  useEffect(() => {
    if (parsedData['sleeps.csv']) {
      console.log('full sleeps data:', parsedData['sleeps.csv']);
    }
  }, [parsedData]);

  return (
    <Router>
      <div className="flex min-h-screen bg-white text-gray-900">
        <Navbar />
        <main className="ml-40 p-10 w-full bg-gray-50 min-h-screen text-gray-900">
          <Routes>
            <Route
              path="/"
              element={<ImportForm onFolderSubmit={handleFolderSubmit} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard parsedData={parsedData} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
