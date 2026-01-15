import agendaData from '@/data/agenda.json';
import Link from 'next/link';

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
  shopping: 'bg-blue-100 text-blue-800 border-blue-200',
  meal: 'bg-orange-100 text-orange-800 border-orange-200',
  attraction: 'bg-purple-100 text-purple-800 border-purple-200',
  event: 'bg-red-100 text-red-800 border-red-200',
  travel: 'bg-gray-100 text-gray-800 border-gray-200',
  village: 'bg-green-100 text-green-800 border-green-200',
  scenic: 'bg-teal-100 text-teal-800 border-teal-200',
  hiking: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  snow_play: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  transport: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  skiing: 'bg-sky-100 text-sky-800 border-sky-200',
  experience: 'bg-pink-100 text-pink-800 border-pink-200',
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4 transition-colors"
          >
            ← Back to Home
          </Link>
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {trip.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="font-medium">{trip.start_date} to {trip.end_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🕐</span>
                <span>{trip.timezone}</span>
              </div>
            </div>
            
            {/* Bases */}
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Accommodations</h3>
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
              ))}
            </div>
          </div>
        </div>

        {/* Days Timeline */}
        <div className="space-y-6">
          {days.map((day: Day, dayIdx: number) => (
            <div key={day.date} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Day Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-bold">{day.day}</h2>
                    <p className="text-indigo-100">{day.date}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                    <span className="text-xl">📍</span>
                    <span className="font-medium">{day.location}</span>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="p-5 md:p-6">
                {day.activities.map((activity: Activity, actIdx: number) => (
                  <div key={actIdx} className="relative">
                    {/* Timeline connector line */}
                    {actIdx < day.activities.length - 1 && (
                      <div className="absolute left-[20px] md:left-[45px] top-[60px] bottom-[-16px] w-1 bg-gradient-to-b from-indigo-300 to-purple-300 z-0" />
                    )}
                    
                    <div className="relative z-10 mb-4">
                      <div
                        className={`border-2 rounded-xl p-4 md:p-5 transition-all hover:shadow-md ${
                          activityColors[activity.type] || 'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          {/* Time & Icon */}
                          <div className="flex items-center gap-3 md:flex-col md:items-center md:gap-2 md:min-w-[80px] relative">
                            {/* Connection dot */}
                            <div className="absolute -left-3 md:-left-[26px] top-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white shadow-md z-20" />
                            
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

                          {/* Content */}
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
          ))}
        </div>
      </div>
    </main>
  );
}
