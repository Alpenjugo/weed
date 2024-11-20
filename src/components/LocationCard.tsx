import React from 'react';
import { Clock, Flower2, MapPin } from 'lucide-react';
import { Location } from '../types';

interface LocationCardProps {
  location: Location;
  timeUntil420: string;
  currentTime: string;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, timeUntil420, currentTime }) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all hover:shadow-xl border border-gray-700">
      <div className="aspect-video w-full overflow-hidden bg-green-900/30 flex items-center justify-center">
        <Flower2 className="h-24 w-24 text-green-400 rotate-45" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Flower2 className="h-5 w-5 text-green-400 rotate-45" />
          <h3 className="text-2xl font-bold text-gray-100">{location.name}</h3>
        </div>
        <p className="mt-2 text-gray-400">{location.description}</p>
        
        <div className="mt-4 flex items-center gap-2 text-gray-300">
          <Clock className="h-5 w-5" />
          <span className="font-medium">Current time: {currentTime}</span>
        </div>
        
        <div className="mt-2 rounded-lg bg-green-900/30 p-3 border border-green-700/30">
          <p className="text-green-400">
            <span className="font-semibold">Next 4:20 in:</span> {timeUntil420}
          </p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
        >
          <MapPin className="h-4 w-4" />
          <span>View on Maps</span>
        </a>
      </div>
    </div>
  );
};