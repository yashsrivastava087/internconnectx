import React from "react";
import { Button } from "./ui/button";

const Herosec = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          India’s No. 1 Platform for Students & Freshers
        </span>

        <h1 className="text-5xl font-bold">
          Find Internships, Apply & <br /> Kickstart Your{" "}
          <span className="text-[#a3bc00]">Career</span>
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover internships, fresher jobs, and placement opportunities 
          designed for college students. Build experience, grow skills, and 
          land your first dream role with ease.
        </p>

        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Search internships or entry-level jobs"
            className="outline-none border-none w-full"
          />
          <Button className="rounded-r-full bg-[#6A38C2] text-white px-6">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Herosec;
