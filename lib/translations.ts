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

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  }, []);

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key];
  };

  return { t, language, setLanguage };
}
