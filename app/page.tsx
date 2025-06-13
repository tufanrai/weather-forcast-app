"use client";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { WeatherInstance } from "./api/weatherApi";

export default function Home() {
  return (
    <div className="w-full h-screen bg-[url('/background.jpg')] bg-no-repeat bg-cover bg-center flex justify-center items-center">
      <div className="max-w-100 max-h-150 w-full h-full border border-black/10 rounded-lg backdrop-blur-md bg-black/10 shadow-md shadow-black/50 flex flex-col items-center">
        <div className="py-5">
          <h1 className="font-black text-2xl text-black">Weather forcast</h1>
        </div>
        <div className="w-full h-full">
          <WeatherCard />
        </div>
      </div>
    </div>
  );
}
