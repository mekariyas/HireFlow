import { RiComputerFill } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { MdOutlineConstruction } from "react-icons/md";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { SiCardmarket } from "react-icons/si";

const Categories = () => {
  return (
    <section className="w-full pt-10 pb-10 flex flex-col items-center justify-around gap-10 bg-blue-900 overflow-hidden">
      <h2 className="font-extrabold text-xl lg:text-5xl text-white">
        Hire workers in various niches
      </h2>
      <ul className="w-screen md:w-full lg:w-[80%] flex flex-col items-center md:flex-row flex-wrap justify-between gap-4 rounded-md p-10 bg-slate-950 shadow-xl">
        <li className=" flex flex-col items-center justify-center gap-4 w-[75%] md:w-[30%] h-[40vh] bg-white rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-red-400 ease-in-out hover:shadow-lg hover:shadow-white cursor-pointer">
          <RiComputerFill className="w-20 h-20" />
          <h3 className="w-full text-xl font-bold text-center">Tech</h3>
          <p className="text-red-400 font-bold">(200)</p>
        </li>
        <li className=" flex flex-col items-center justify-center gap-4 w-[75%] md:w-[30%] h-[40vh] bg-white rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-red-400 ease-in-out hover:shadow-lg hover:shadow-white cursor-pointer">
          <MdHealthAndSafety className="w-20 h-20" />
          <h3 className="w-full text-xl font-bold text-center">Health Care</h3>
          <p className="text-red-400 font-bold">(870)</p>
        </li>
        <li className=" flex flex-col items-center justify-center gap-4 w-[75%] md:w-[30%] h-[40vh] bg-white rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-red-400 ease-in-out hover:shadow-lg hover:shadow-white cursor-pointer">
          <SiCardmarket className="w-20 h-20" />
          <h3 className="w-full text-xl font-bold text-center">Marketing</h3>
          <p className="text-red-400 font-bold">(150)</p>
        </li>
        <li className=" flex flex-col items-center justify-center gap-4 w-[75%] md:w-[30%] h-[40vh] bg-white rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-red-400 ease-in-out hover:shadow-lg hover:shadow-white cursor-pointer">
          <FaMoneyBillTransfer className="w-20 h-20" />
          <h3 className="w-full text-xl font-bold text-center">
            Accounting and Business
          </h3>
          <p className="text-red-400 font-bold">(560)</p>
        </li>
        <li className=" flex flex-col items-center justify-center gap-4 w-[75%] md:w-[30%] h-[40vh] bg-white rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-red-400 ease-in-out hover:shadow-lg hover:shadow-white cursor-pointer">
          <MdOutlineConstruction className="w-20 h-20" />
          <h3 className="w-full text-xl font-bold text-center">Construction</h3>
          <p className="text-red-400 font-bold">(400)</p>
        </li>
        <li className=" flex flex-col items-center justify-center gap-4 w-[75%] md:w-[30%] h-[40vh] bg-white rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-red-400 ease-in-out hover:shadow-lg hover:shadow-white cursor-pointer">
          <MdOutlineRealEstateAgent className="w-20 h-20" />
          <h3 className="w-full text-xl font-bold text-center">Real Estate</h3>
          <p className="text-red-400 font-bold">(350)</p>
        </li>
      </ul>
    </section>
  );
};

export default Categories;
