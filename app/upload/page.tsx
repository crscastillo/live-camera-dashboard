'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/translations';
import Navigation from '@/components/Navigation';

export default function UploadPage() {
  const { t, language, setLanguage } = useTranslation();
  const [activeTab, setActiveTab] = useState<'file' | 'paste'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setMessage('');
    }
  };

  const handlePasteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Paste] Paste JSON submit started');
    
    if (!jsonText.trim()) {
      console.log('[Paste] Empty JSON text');
      setStatus('error');
      setMessage(t('emptyJson'));
      return;
    }

    console.log('[Paste] JSON text length:', jsonText.length);

    // Validate JSON
    try {
      const parsed = JSON.parse(jsonText);
      console.log('[Paste] JSON validation passed:', parsed);
    } catch (err) {
      console.error('[Paste] JSON validation failed:', err);
      setStatus('error');
      setMessage(t('invalidJson'));
      return;
    }

    setStatus('uploading');
    
    // Create a blob from the JSON text
    const blob = new Blob([jsonText], { type: 'application/json' });
    console.log('[Paste] Blob created, size:', blob.size);
    const formData = new FormData();
    formData.append('file', blob, 'agenda.json');
    console.log('[Paste] FormData created, sending to API...');

    try {
      const response = await fetch('/api/upload-agenda', {
        method: 'POST',
        body: formData,
      });

      console.log('[Paste] API response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('[Paste] Success response:', result);
        setStatus('success');
        setMessage(t('uploadSuccess'));
        setJsonText('');
      } else {
        const error = await response.json();
        console.error('[Paste] Error response:', error);
        setStatus('error');
        // Show the full error message from the API
        setMessage(error.error || t('uploadFailed'));
      }
    } catch (error) {
      console.error('[Paste] Network error:', error);
      setStatus('error');
      setMessage(t('networkError'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Upload] File upload started');
    
    if (!file) {
      console.log('[Upload] No file selected');
      setStatus('error');
      setMessage(t('pleaseSelectFile'));
      return;
    }

    console.log('[Upload] File selected:', file.name, file.size, 'bytes');

    // Validate JSON
    const text = await file.text();
    console.log('[Upload] File read, length:', text.length);
    try {
      const parsed = JSON.parse(text);
      console.log('[Upload] JSON validation passed:', parsed);
    } catch (err) {
      console.error('[Upload] JSON validation failed:', err);
      setStatus('error');
      setMessage(t('invalidJson'));
      return;
    }

    setStatus('uploading');
    
    const formData = new FormData();
    formData.append('file', file);
    console.log('[Upload] FormData created, sending to API...');

    try {
      const response = await fetch('/api/upload-agenda', {
        method: 'POST',
        body: formData,
      });

      console.log('[Upload] API response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('[Upload] Success response:', result);
        setStatus('success');
        setMessage(t('uploadSuccess'));
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        const error = await response.json();
        console.error('[Upload] Error response:', error);
        setStatus('error');
        // Show the full error message from the API
        setMessage(error.error || t('uploadFailed'));
      }
    } catch (error) {
      console.error('[Upload] Network error:', error);
      setStatus('error');
      setMessage(t('networkError'));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t('updateAgendaTitle')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('updateAgendaDescription')}
            </p>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('file');
                  setStatus('idle');
                  setMessage('');
                }}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'file'
                    ? 'border-b-2 border-gray-800 text-gray-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📁 {t('uploadFile')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('paste');
                  setStatus('idle');
                  setMessage('');
                }}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'paste'
                    ? 'border-b-2 border-gray-800 text-gray-800'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📋 {t('pasteJson')}
              </button>
            </div>

            {/* File Upload Tab */}
            {activeTab === 'file' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="file-input" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('selectJsonFile')}
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
                    {t('selected')}: {file.name}
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
                  {status === 'uploading' && t('uploading')}
                  {status === 'success' && `${t('success')} ${message}`}
                  {status === 'error' && `${t('error')} ${message}`}
                </div>
              )}

              <button
                type="submit"
                disabled={!file || status === 'uploading'}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold
                  hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                  transition-colors"
              >
                {status === 'uploading' ? t('uploadingButton') : t('uploadButton')}
              </button>
            </form>
            )}

            {/* Paste JSON Tab */}
            {activeTab === 'paste' && (
            <form onSubmit={handlePasteSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="json-textarea" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('pasteJson')}
                </label>
                <textarea
                  id="json-textarea"
                  value={jsonText}
                  onChange={(e) => {
                    setJsonText(e.target.value);
                    setStatus('idle');
                    setMessage('');
                  }}
                  placeholder={t('jsonPlaceholder')}
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-gray-800 focus:border-transparent
                    font-mono text-sm resize-y"
                />
                {jsonText && (
                  <p className="mt-2 text-sm text-gray-600">
                    {jsonText.length} characters
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
                  {status === 'uploading' && t('validating')}
                  {status === 'success' && `${t('success')} ${message}`}
                  {status === 'error' && `${t('error')} ${message}`}
                </div>
              )}

              <button
                type="submit"
                disabled={!jsonText.trim() || status === 'uploading'}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold
                  hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                  transition-colors"
              >
                {status === 'uploading' ? t('validating') : t('validateAndSave')}
              </button>
            </form>
            )}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">{t('fileRequirements')}</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>{t('requirement1')}</li>
                <li>{t('requirement2')}</li>
                <li>{t('requirement3')}</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Production Limitation</h3>
              <p className="text-sm text-yellow-700 mb-2">
                <strong>This feature only works in local development.</strong>
              </p>
              <p className="text-sm text-yellow-700 mb-2">
                On Vercel production, the filesystem is read-only. To update the agenda in production:
              </p>
              <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
                <li>Edit <code className="bg-yellow-100 px-1 rounded">data/agenda.json</code> in your local repository</li>
                <li>Commit and push to GitHub</li>
                <li>Vercel will automatically redeploy with the updated agenda</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
