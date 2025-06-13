import { weatInstance } from "./apiInstance";

interface IProps {
  lat: string;
  lon: string;
}

export const WeatherInstance = async ({ lat, lon }: IProps) => {
  try {
    const response = await weatInstance.get("/weather", {
      params: { lat, lon },
    });
    return response;
  } catch (err: any) {
    return err;
  }
};
