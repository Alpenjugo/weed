import { parseISO, addDays, format, differenceInMinutes } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const getNext420 = (currentTimeStr: string, timezone: string) => {
  const currentTime = utcToZonedTime(parseISO(currentTimeStr), timezone);
  let next420 = new Date(currentTime);
  next420.setHours(4, 20, 0, 0);

  if (currentTime.getHours() > 4 || (currentTime.getHours() === 4 && currentTime.getMinutes() >= 20)) {
    next420 = addDays(next420, 1);
  }

  const minutesUntil = differenceInMinutes(next420, currentTime);
  const hours = Math.floor(minutesUntil / 60);
  const minutes = minutesUntil % 60;

  return {
    next420Time: format(next420, 'HH:mm'),
    timeUntil: `${hours}h ${minutes}m`,
    currentTimeFormatted: format(currentTime, 'HH:mm'),
    minutesUntil
  };
};