'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setStatus('error');
      setMessage('Please select a file');
      return;
    }

    // Validate JSON
    const text = await file.text();
    try {
      JSON.parse(text);
    } catch (err) {
      setStatus('error');
      setMessage('Invalid JSON file');
      return;
    }

    setStatus('uploading');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-agenda', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Agenda updated successfully!');
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        const error = await response.json();
        setStatus('error');
        setMessage(error.error || 'Upload failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error occurred');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/agenda" 
          className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-6 transition-colors"
        >
          ← Back to Agenda
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Update Agenda
          </h1>
          <p className="text-gray-600 mb-8">
            Upload a new JSON file to replace the current agenda
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="file-input" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select JSON File
              </label>
              <input
                id="file-input"
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-800 file:text-white
                  hover:file:bg-gray-700
                  file:cursor-pointer cursor-pointer
                  border border-gray-300 rounded-lg"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {status !== 'idle' && (
              <div className={`p-4 rounded-lg ${
                status === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : status === 'error'
                  ? 'bg-red-50 border border-red-200 text-red-800'
                  : 'bg-blue-50 border border-blue-200 text-blue-800'
              }`}>
                {status === 'uploading' && '⏳ Uploading...'}
                {status === 'success' && `✅ ${message}`}
                {status === 'error' && `❌ ${message}`}
              </div>
            )}

            <button
              type="submit"
              disabled={!file || status === 'uploading'}
              className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold
                hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                transition-colors"
            >
              {status === 'uploading' ? 'Uploading...' : 'Upload & Replace Agenda'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">📋 File Requirements</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Must be a valid JSON file</li>
              <li>• Will completely replace the existing agenda</li>
              <li>• Changes take effect immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
