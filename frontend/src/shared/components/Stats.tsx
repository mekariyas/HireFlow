import React from "react";




const Stats = () => {
  return (
    <section className="w-full h-[70vh] md:h-[40vh] flex flex-col justify-around items-center  bg-slate-950">
      <ul className="w-full h-full flex flex-col gap-5 md:flex-row  justify-around items-center text-white">
        <li className="w-[30%] md:w-[15%] flex flex-col items-center gap-2">
          <h2 className="font-extrabold text-4xl">48K+</h2>
          <p className="text-gray-400 font-bold">Jobs posted</p>
        </li> 
        <li className="w-[30%] md:w-[15%] flex flex-col items-center gap-2">
          <h2 className="font-extrabold text-4xl">12K+</h2>
          <p className="text-gray-400 font-bold">Companies</p>
        </li>  
        <li className="w-[30%] md:w-[15%] flex flex-col items-center gap-2">
          <h2 className="font-extrabold text-4xl">200K+</h2>
          <p className="text-gray-400 font-bold">Candidates</p>
        </li> 
        <li className="w-[30%] md:w-[15%] flex flex-col items-center gap-2">
          <h2 className="font-extrabold text-4xl">90%</h2>
          <p className="text-gray-400 font-bold">Placement Rate</p>
        </li>             
      </ul>
    </section>
  );
};

export default Stats;
