import {
  GeoError,
  GeolocationPosition,
} from '@/interfaces/geolocation-position';

const options = {
  enableHighAccuracy: false,
  timeout: 7000,
  maximumAge: 0,
};

export default {
  loadCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('現在地情報を取得できませんでした');
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  },
};
