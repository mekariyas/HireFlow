
const Footer = () => {
  return <footer className="w-full h-[90vh] lg:h-72 bg-black flex flex-col gap-4 items-center">
      <section className="w-full h-[15%] flex items-center pl-10">
        <p className="text-white font-extrabold text-xl">Hire<span className="text-indigo-400">Flow</span></p>
      </section>
      <section className="w-full h-[65%] text-white flex flex-col lg:flex-row lg:justify-around">
        <section className="flex flex-col gap-2 text-white">
          <p className="font-semibold cursor-pointer">Instagram</p>
          <p className="font-semibold cursor-pointer">Facebook</p>
          <p className="font-semibold cursor-pointer">X</p>
          <p className="font-semibold cursor-pointer">Linkedin</p>
        </section>
        <section className="flex flex-col gap-2 text-white">
          <p className="font-semibold cursor-pointer">FAQ</p>
          <p className="font-semibold cursor-pointer">Events</p>
          <p className="font-semibold cursor-pointer">Newsletter</p>
          <p className="font-semibold cursor-pointer">Contact</p>
        </section>
        <section className="flex flex-col gap-2 text-white">
          <p className="font-semibold cursor-pointer">Terms & Conditions </p>
          <p className="font-semibold cursor-pointer">Privacy Policy</p>
          <p className="font-semibold cursor-pointer">Miscellaneous</p>
        </section>
      </section>
      <hr className="w-[85%] h-1 bg-white mb-2"/>
    <section className="w-full flex items-center justify-center">
      <p className="w-[80%] italic text-white text-lg">&copy; Hireflow 2026, all rights reserved.</p>
    </section>
  </footer>;
};

export default Footer;
