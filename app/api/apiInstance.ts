import axios from "axios";

// const url =
//   "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

export const geoInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GEOCODING_API_KEY,
  params: {
    appid: process.env.NEXT_PUBLIC_API_KEY,
    limit: 1,
  },
});

export const weatInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  params: {
    appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
    limit: 3,
  },
});
