import { useState, useEffect } from 'react';
import { TimeZoneResponse } from '../types';

export const useTimeData = (timezone: string) => {
  const [timeData, setTimeData] = useState<TimeZoneResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(
          `https://timeapi.io/api/timezone/zone?timeZone=${encodeURIComponent(timezone)}`
        );
        if (!response.ok) throw new Error('Failed to fetch time data');
        const data = await response.json();
        setTimeData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchTime();
    const interval = setInterval(fetchTime, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [timezone]);

  return { timeData, error };
};