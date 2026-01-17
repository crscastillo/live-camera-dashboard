'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language } from '@/lib/translations';

interface NavProps {
  language?: Language;
  setLanguage?: (lang: Language) => void;
  showLanguageToggle?: boolean;
}

export default function Navigation({ language, setLanguage, showLanguageToggle = false }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">📹</span>
            <span className="font-bold text-gray-800 hidden sm:inline">Live Dashboard</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📹 Cameras
            </Link>
            <Link
              href="/agenda"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname === '/agenda'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📅 Agenda
            </Link>

            {/* Language Toggle */}
            {showLanguageToggle && language && setLanguage && (
              <>
                <div className="hidden sm:block w-px h-8 bg-gray-300 mx-2" />
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      language === 'en'
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('es')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      language === 'es'
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    ES
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
