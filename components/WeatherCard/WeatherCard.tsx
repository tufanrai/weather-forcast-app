"use client";
import { cityGeo } from "@/app/api/GeoApi";
import { ISearch } from "@/interface/SearchInterface";
import { searchSchema } from "@/schema/SearchSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { WeatherInstance } from "@/app/api/weatherApi";
import WeatherIcons from "../weatherIcons/WeatherIcons";
import { RiCelsiusLine } from "react-icons/ri";
import DateComponent from "../dateComponent/DateComponent";

interface Values {}

const WeatherCard = () => {
  // data storing hooks
  const [Weather, setWeather] = useState({});

  // coordinate finding hook
  const { mutate, isPending } = useMutation({
    mutationFn: cityGeo,
    mutationKey: ["fetch-geo-cordinates"],
    onSuccess: (data) => {
      reset();
      if (data && data.data) {
        WeatherData.mutate({ lat: data.data[0].lat, lon: data.data[0].lon });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // weather data fiding hook
  const WeatherData = useMutation({
    mutationFn: WeatherInstance,
    mutationKey: ["fetch-all-data"],
    onSuccess: (data) => {
      setWeather(data.data);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  // input validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  // input handling function
  const SearchCity: SubmitHandler<ISearch> = (data) => {
    mutate(data);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-8">
      {/* This is the form area */}
      <form
        onClick={handleSubmit(SearchCity)}
        className="flex items-center justify-center w-full py-4"
      >
        <div className="mr-5">
          <input
            className="border-b border-white px-5 py-2 font-semibold text-white text-sm focus:outline-none"
            type="text"
            placeholder="Kathmandu, Nepal"
            {...register("city")}
          />
        </div>
        <div>
          <button
            className="border border-white p-2 rounded-full text-white cursor-pointer"
            type="submit"
          >
            <CiSearch />
          </button>
        </div>
      </form>
      {/* This is the display area */}
      {WeatherData.data && WeatherData.data ? (
        <div className="w-full h-full px-8 py-4 flex flex-col items-center justify-between gap-5">
          <div>
            <h3 className="w-full text-center font-thin text-2xl">
              {/* @ts-ignore */}
              {Weather?.name}
            </h3>
            <DateComponent />
          </div>
          <div className="w-full">
            <div className="w-full h-20">
              {/* @ts-ignore */}
              <WeatherIcons id={Weather?.weather?.at(0).id} />
            </div>
            <div className="w-full">
              <h3 className=" py-2 flex justify-center items-start">
                {/* @ts-ignore */}
                {(Weather?.main?.temp - 273.15).toFixed(1)}
                <RiCelsiusLine />
              </h3>
              <h6 className="text-center font-semibold tracking-wide text-lg">
                {/* @ts-ignore */}
                {Weather?.weather?.at(0).main}
              </h6>
              <h6 className="text-center tracking-wider font-thin text-md">
                {/* @ts-ignore */}
                {Weather?.weather?.at(0).description}
              </h6>
            </div>
          </div>
          <hr className="w-full" />
          <div className="w-full flex items-center justify-between mb-8">
            <div className="w-full flex flex-col items-center">
              <h6 className="font-thin text-sm">Wind speed</h6>
              {/* @ts-ignore */}
              {Weather?.wind?.speed}
            </div>
            <div className="w-full flex flex-col items-center">
              <h6 className="font-thin text-sm">Humidity</h6>
              {/* @ts-ignore */}
              {Weather?.main?.humidity}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          Please search for a city...
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
