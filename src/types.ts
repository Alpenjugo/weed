export interface TimeZoneResponse {
  timeZone: string;
  currentLocalTime: string;
  currentUtcOffset: {
    seconds: number;
    milliseconds: number;
  };
  hasDayLightSaving: boolean;
  isDayLightSavingActive: boolean;
}

export interface Location {
  id: string;
  name: string;
  timezone: string;
  image: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}