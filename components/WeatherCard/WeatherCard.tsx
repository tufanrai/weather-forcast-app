"use client";
import { cityGeo } from "@/app/api/GeoApi";
import { ISearch } from "@/interface/SearchInterface";
import { searchSchema } from "@/schema/SearchSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { WeatherInstance } from "@/app/api/weatherApi";

const WeatherCard = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: cityGeo,
    mutationKey: ["fetch-geo-cordinates"],
    onSuccess: (data) => {
      console.log(data.data[0]);
      reset();
      if (data && data.data) {
        console.log(data.data[0].lat, data.data[0].lon);
        weatherData.mutate({ lat: data.data[0].lat, lon: data.data[0].lon });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const weatherData = useMutation({
    mutationFn: WeatherInstance,
    mutationKey: ["fetch-weather-data"],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  const SearchCity: SubmitHandler<ISearch> = (data) => {
    mutate(data);
  };

  return (
    <form
      onClick={handleSubmit(SearchCity)}
      className="flex items-center justify-center"
    >
      <div className="mr-5">
        <input
          className="border rounded-md px-5 py-2 font-thin text-black text-sm focus:outline-none"
          type="text"
          placeholder="Kathmandu, Nepal"
          {...register("city")}
        />
      </div>
      <div>
        <button
          className="border border-black p-2 rounded-full text-black ease duration-200 hover:bg-black hover:text-white cursor-pointer"
          type="submit"
        >
          <CiSearch />
        </button>
      </div>
    </form>
  );
};

export default WeatherCard;
