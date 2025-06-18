import React, { useState } from 'react';
import Section from '../components/Section';
import { AiOutlineFilePdf, AiOutlineFileImage } from "react-icons/ai";
import { FaTrash, FaDownload } from "react-icons/fa";

const Records = () => {
  const [records, setRecords] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const newRecords = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      file,
      uploadedAt: new Date().toISOString()
    }));

    setRecords(prev => [...prev, ...newRecords]);
  };

  const handleDelete = (id) => {
    setRecords(prev => prev.filter(rec => rec.id !== id));
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Section className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">🗂️ Medical Records</h1>
        <label className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg cursor-pointer text-sm">
          Upload Records
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {records.length === 0 ? (
        <div className="text-stone-500 text-sm text-center mt-10">
          No medical records yet. Start by uploading your files above.
        </div>
      ) : (
        <div className="grid gap-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg border border-neutral-800 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl text-green-500">
                  {rec.type.includes("pdf") ? <AiOutlineFilePdf /> : <AiOutlineFileImage />}
                </div>
                <div>
                  <p className="text-white text-sm">{rec.name}</p>
                  <p className="text-stone-500 text-xs">Uploaded on {formatDate(rec.uploadedAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={URL.createObjectURL(rec.file)}
                  download={rec.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300"
                >
                  <FaDownload />
                </a>
                <button
                  onClick={() => handleDelete(rec.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};

export { Records };
