export interface GeolocationPosition {
  coords: {
    accuracy: number;
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

export interface GeoError {
  code: number;
}
