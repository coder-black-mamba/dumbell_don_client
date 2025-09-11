import React from "react";
import HeroAreaImage from "../../assets/hero-bg.jpg";
const HeroArea = () => {
  return (
    <div
      className="flex flex-col  justify-center items-center bg-center bg-cover min-h-screen  "
      style={{ backgroundImage: `url(${HeroAreaImage})` }}
    >
      <div className="w-1/2 w-md-full px-5 text-center">
        <h1 className="text-7xl font-bold text-white px-5 w-full">
          Fell The <span className="text-brand">Burn</span>, Love The
          <span className="text-brand">Results</span>
        </h1>
        <p className="text-base-content text-sm px-5 font-medium">
          We are a professional gym located in the heart of the city. Our gym
          offers you a variety of equipment and personalized training programs
          to help you achieve your fitness goals. Our experienced trainers will
          guide you through each workout, providing you with the support and
          motivation you need to succeed.
        </p>
        <button className="btn bg-brand text-white px-5 w-full md:w-auto mt-5 py-8 px-15 text-2xl">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default HeroArea;
