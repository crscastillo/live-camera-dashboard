'use client';

import { useState, useEffect } from 'react';

export type Language = 'en' | 'es';

const translations = {
  en: {
    backToHome: '← Back to Home',
    updateAgenda: '📤 Update Agenda',
    accommodations: 'Accommodations',
    backToAgenda: '← Back to Agenda',
    updateAgendaTitle: 'Update Agenda',
    updateAgendaDescription: 'Upload a new JSON file to replace the current agenda',
    selectJsonFile: 'Select JSON File',
    selected: 'Selected',
    uploading: '⏳ Uploading...',
    success: '✅',
    error: '❌',
    uploadButton: 'Upload & Replace Agenda',
    uploadingButton: 'Uploading...',
    uploadFile: 'Upload File',
    pasteJson: 'Paste JSON',
    jsonPlaceholder: 'Paste your JSON content here...',
    validateAndSave: 'Validate & Save',
    validating: 'Validating...',
    emptyJson: 'Please paste JSON content',
    fileRequirements: '📋 File Requirements',
    requirement1: '• Must be a valid JSON file',
    requirement2: '• Will completely replace the existing agenda',
    requirement3: '• Changes take effect immediately',
    pleaseSelectFile: 'Please select a file',
    invalidJson: 'Invalid JSON file',
    uploadSuccess: 'Agenda updated successfully!',
    uploadFailed: 'Upload failed',
    networkError: 'Network error occurred',
  },
  es: {
    backToHome: '← Volver al inicio',
    updateAgenda: '📤 Actualizar agenda',
    accommodations: 'Alojamientos',
    backToAgenda: '← Volver a la agenda',
    updateAgendaTitle: 'Actualizar agenda',
    updateAgendaDescription: 'Sube un nuevo archivo JSON para reemplazar la agenda actual',
    selectJsonFile: 'Seleccionar archivo JSON',
    selected: 'Seleccionado',
    uploading: '⏳ Subiendo...',
    success: '✅',
    error: '❌',
    uploadButton: 'Subir y reemplazar agenda',
    uploadingButton: 'Subiendo...',
    uploadFile: 'Subir archivo',
    pasteJson: 'Pegar JSON',
    jsonPlaceholder: 'Pega tu contenido JSON aquí...',
    validateAndSave: 'Validar y guardar',
    validating: 'Validando...',
    emptyJson: 'Por favor pega contenido JSON',
    fileRequirements: '📋 Requisitos del archivo',
    requirement1: '• Debe ser un archivo JSON válido',
    requirement2: '• Reemplazará completamente la agenda existente',
    requirement3: '• Los cambios toman efecto inmediatamente',
    pleaseSelectFile: 'Por favor selecciona un archivo',
    invalidJson: 'Archivo JSON inválido',
    uploadSuccess: '¡Agenda actualizada exitosamente!',
    uploadFailed: 'La carga falló',
    networkError: 'Ocurrió un error de red',
  },
};

// Cookie helper functions
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check cookie first for user preference
    const savedLanguage = getCookie('preferredLanguage') as Language | null;
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    } else {
      // Fall back to browser language if no saved preference
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('es')) {
        setLanguage('es');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setCookie('preferredLanguage', lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key];
  };

  return { t, language, setLanguage: handleSetLanguage };
}
