import React from 'react';
import { Flower2 } from 'lucide-react';
import { locations } from './data/locations';
import { LocationCard } from './components/LocationCard';
import { useTimeData } from './hooks/useTimeData';
import { getNext420 } from './utils/timeUtils';

function App() {
  const timeDataMap = Object.fromEntries(
    locations.map(location => [
      location.timezone,
      useTimeData(location.timezone)
    ])
  );

  const upcomingLocations = locations
    .filter(location => {
      const { timeData } = timeDataMap[location.timezone];
      if (!timeData) return false;
      
      const { minutesUntil } = getNext420(timeData.currentLocalTime, location.timezone);
      return minutesUntil <= 60;
    })
    .sort((a, b) => {
      const timeA = timeDataMap[a.timezone].timeData?.currentLocalTime || '';
      const timeB = timeDataMap[b.timezone].timeData?.currentLocalTime || '';
      const minutesA = getNext420(timeA, a.timezone).minutesUntil;
      const minutesB = getNext420(timeB, b.timezone).minutesUntil;
      return minutesA - minutesB;
    })
    .slice(0, 5);

  const gridCols = upcomingLocations.length < 3 
    ? 'md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 max-w-md mx-auto' 
    : upcomingLocations.length < 4
    ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-4xl mx-auto'
    : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3">
            <Flower2 className="h-12 w-12 text-green-400 rotate-45" />
            <h1 className="text-4xl font-bold text-green-400">Next 4:20 Countdown</h1>
          </div>
          <p className="mt-4 text-xl text-gray-300">
            Places Hitting 4:20 Within The Next Hour
          </p>
        </header>

        {upcomingLocations.length > 0 ? (
          <div className={`grid gap-8 ${gridCols}`}>
            {upcomingLocations.map((location) => {
              const { timeData } = timeDataMap[location.timezone];
              if (!timeData) return null;

              const { timeUntil, currentTimeFormatted } = getNext420(
                timeData.currentLocalTime,
                location.timezone
              );

              return (
                <LocationCard
                  key={location.id}
                  location={location}
                  timeUntil420={timeUntil}
                  currentTime={currentTimeFormatted}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-300 text-xl">
            <p>No locations are hitting 4:20 within the next hour.</p>
            <p className="mt-2">Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;