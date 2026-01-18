'use client';

import agendaData from '@/data/agenda.json';
import Link from 'next/link';
import { useTranslation } from '@/lib/translations';
import Navigation from '@/components/Navigation';
import { useEffect, useRef } from 'react';

interface Activity {
  type: string;
  title: string;
  start_time?: string;
  end_time?: string;
  location: string;
  description: string;
  notes?: string;
}

interface Day {
  date: string;
  day: string;
  location: string;
  activities: Activity[];
}

interface Base {
  date?: string;
  date_range?: string;
  location: string;
  lodging: string;
}

const activityColors: Record<string, string> = {
  shopping: 'bg-gray-50 text-gray-800 border-gray-300',
  meal: 'bg-gray-50 text-gray-800 border-gray-300',
  attraction: 'bg-gray-50 text-gray-800 border-gray-300',
  event: 'bg-gray-50 text-gray-800 border-gray-300',
  travel: 'bg-gray-50 text-gray-800 border-gray-300',
  village: 'bg-gray-50 text-gray-800 border-gray-300',
  scenic: 'bg-gray-50 text-gray-800 border-gray-300',
  hiking: 'bg-gray-50 text-gray-800 border-gray-300',
  snow_play: 'bg-gray-50 text-gray-800 border-gray-300',
  transport: 'bg-gray-50 text-gray-800 border-gray-300',
  skiing: 'bg-gray-50 text-gray-800 border-gray-300',
  experience: 'bg-gray-50 text-gray-800 border-gray-300',
};

const activityIcons: Record<string, string> = {
  shopping: '🛍️',
  meal: '🍽️',
  attraction: '🎪',
  event: '🎭',
  travel: '🚗',
  village: '🏔️',
  scenic: '🌄',
  hiking: '🥾',
  snow_play: '⛷️',
  transport: '🚡',
  skiing: '⛷️',
  experience: '✨',
};

export default function AgendaPage() {
  const { trip, days } = agendaData;
  const todayRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split('T')[0];
  
  const isPastDay = (dayDate: string) => {
    return dayDate < today;
  };

  useEffect(() => {
    // Scroll to today's section after component mounts
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []) return dayDate < today;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-end mb-4">
            <Link 
              href="/upload" 
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              {t('updateAgenda')}
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {trip.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="font-medium">
                  {getLocalizedDate(trip.start_date)} {language === 'es' ? 'a' : 'to'} {getLocalizedDate(trip.end_date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🕐</span>
                <span>{trip.timezone}</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{t('accommodations')}</h3>
              {trip.bases.map((base: Base, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">🏨</span>
                  <div>
                    <p className="font-medium text-gray-800">{base.lodging}</p>
                    <p className="text-sm text-gray-600">
                      {base.location} • {base.date || base.date_range}
                    </p>
                  </div>
                </div>
            const isToday = day.date === today;
            
            return (
              <div 
                key={day.date} 
                ref={isToday ? todayRef : null}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${isDayPast ? 'opacity-50' : ''}`}
              
        </div>

        <div className="space-y-6">
          {days.map((day: Day) => {
            const isDayPast = isPastDay(day.date);
            const isToday = day.date === today;
            
            return (
              <div 
                key={day.date} 
                ref={isToday ? todayRef : null}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${isDayPast ? 'opacity-50' : ''}`}
              >
                <div className={`${isDayPast ? 'bg-gray-400' : 'bg-gray-800'} text-white p-5 md:p-6`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h2 className="text-2xl font-bold">{getLocalizedDayName(day.date)}</h2>
                      <p className="text-gray-300">{getLocalizedDate(day.date)}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                      <span className="text-xl">📍</span>
                      <span className="font-medium">{day.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  {day.activities.map((activity: Activity, actIdx: number) => (
                    <div key={actIdx} className="relative">
                      {actIdx < day.activities.length - 1 && (
                        <div className="absolute left-[20px] md:left-[45px] top-[60px] bottom-[-16px] w-0.5 bg-gray-300 z-0" />
                      )}
                      
                      <div className="relative z-10 mb-4">
                        <div
                          className={`border rounded-lg p-4 md:p-5 transition-all hover:shadow-sm ${
                            activityColors[activity.type] || 'bg-gray-50 text-gray-800 border-gray-300'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-start gap-4">
                            <div className="flex items-center gap-3 md:flex-col md:items-center md:gap-2 md:min-w-[80px] relative">
                              <div className="absolute -left-3 md:-left-[26px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gray-800 rounded-full border-2 border-white shadow-sm z-20" />
                              
                              <span className="text-3xl relative z-10">{activityIcons[activity.type] || '📌'}</span>
                              {activity.start_time && (
                                <div className="text-center">
                                  <p className="font-bold text-sm">{activity.start_time}</p>
                                  {activity.end_time && (
                                    <p className="text-xs opacity-75">{activity.end_time}</p>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-lg mb-1">{activity.title}</h3>
                              <p className="text-sm font-medium mb-2 flex items-center gap-1">
                                <span>📍</span>
                                {activity.location}
                              </p>
                              <p className="text-sm mb-2">{activity.description}</p>
                              {activity.notes && (
                                <div className="mt-3 p-3 bg-white/50 rounded-lg border border-current/20">
                                  <p className="text-xs font-medium flex items-start gap-2">
                                    <span className="text-base">💡</span>
                                    <span>{activity.notes}</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
