import React, { useEffect, useState } from "react";

const DateComponent = () => {
  // Date
  let amorpm;
  const day = new Date().getUTCDay();
  const hrs = new Date().getHours();
  const min = new Date().getMinutes();
  if (hrs > 12) {
    amorpm = "pm";
  } else {
    amorpm = "am";
  }

  interface Day {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
  }

  const Days: Day = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday",
  };
  return (
    <h6>
      {/* @ts-ignore */}
      {Days[day]} | {hrs - 12} : {min} {amorpm}
    </h6>
  );
};

export default DateComponent;
