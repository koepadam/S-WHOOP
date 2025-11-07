// import Papa from 'papaparse';

export default function ImportForm({ onFolderSubmit }) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    const csvFiles = files.filter(file => file.name.endsWith('.csv'));
    onFolderSubmit(csvFiles);
  };

  return (
    <section className="bg-gray-50 border border-gray-200 rounded-xl shadow-md p-6 mt-6 max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Import WHOOP CSV Files</h2>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Click to upload or drag and drop</span>
            </p>
            <p className="text-xs text-gray-500 italic">WHOOP CSV files only</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept=".csv"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>
    </section>
  );
}

