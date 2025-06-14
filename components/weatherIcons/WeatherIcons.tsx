import React, { useEffect, useState } from "react";
import Clear from "@/public/weatherIcons/clear.png";
import Cloud from "@/public/weatherIcons/cloud.png";
import Drizzle from "@/public/weatherIcons/drizzle.png";
import Rain from "@/public/weatherIcons/rain.png";
import Snow from "@/public/weatherIcons/snow.png";

type vlaue = {
  id: number;
};

const WeatherIcons = ({ id }: vlaue) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if ((id >= 200 && id < 233) || (id >= 500 && id < 532)) {
      setUrl(`${Rain.src}`);
    } else if (id >= 300 && id < 322) {
      setUrl(`${Drizzle.src}`);
    } else if (id >= 600 && id < 623) {
      setUrl(`${Snow.src}`);
    } else if (id == 800) {
      setUrl(`${Clear.src}`);
    } else {
      setUrl(`${Cloud.src}`);
    }
  }, [id]);
  console.log("The id is :", id);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={url} width={100} alt="" />
    </div>
  );
};

export default WeatherIcons;
