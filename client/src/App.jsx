import { useState } from 'react';
import Papa from 'papaparse';

//! COMPONENT IMPORTING
import Navbar from './components/Navbar/Navbar';
import ImportForm from './components/InputForm/InputForm';

import './App.css';

function App() {
  const [csvFiles, setCsvFiles] = useState([]);

  const handleFolderSubmit = (files) => {
    // TODO CHANGE
    setCsvFiles(files);
    console.log('CSV files submitted:', files);


    // const parsedFile = {}; 

    // files.forEach((file) => {
    //   Papa.parse(file, {

    //   })
    //   })



  };

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

