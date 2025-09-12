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
        <p className="text-base-content text-sm px-5 font-medium mt-5">
          We are a professional gym located in the heart of the city. Our gym
          offers you a variety of equipment and personalized training programs
          to help you achieve your fitness goals. Our experienced trainers will
          guide you through each workout, providing you with the support and
          motivation you need to succeed.
        </p>
        <button className="btn bg-brand text-white px-5 w-full md:w-auto mt-5 py-8 px-15 text-2xl">
          Book A Season Now
        </button>

        <div className="my-5 text-center flex justify-center gap-5 py-3 ">
          <div className="single-icon-block flex flex-col items-center px-3 bg-base-100 py-3 rounded w-24">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-brand">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <p className=" my-1">500+</p>
            <p className="text-sm">Happy <br /> Customers</p>
          </div>
          <div className="single-icon-block flex flex-col items-center px-3 bg-base-100 py-3 rounded w-24">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-brand">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            <p className=" my-1">50+</p>
            <p className="text-sm">Certified <br /> Trainers</p>
          </div>
          <div className="single-icon-block flex flex-col items-center px-3 bg-base-100 py-3 rounded w-24">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-brand">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <p className=" my-1">50+</p>
            <p className="text-sm">Years of <br /> Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroArea;
