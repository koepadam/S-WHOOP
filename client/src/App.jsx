import { useEffect, useState } from 'react';
import Papa from 'papaparse';

import Navbar from './components/Navbar/Navbar';
import ImportForm from './components/InputForm/InputForm';

import './App.css';

function App() {
  const [parsedData, setParsedData] = useState({}); // { filename: parsedRows }

  const handleFolderSubmit = (files) => {
    files.forEach((file) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedRows = results.data;

          // first 5 rows for check
          console.log(
            ` ${file.name} — First 5 rows:`,
            parsedRows.slice(0, 5)
          );

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
    <div className="flex min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="ml-32 p-10 w-full">
        <ImportForm onFolderSubmit={handleFolderSubmit} />
      </main>
    </div>
  );
}

export default App;
