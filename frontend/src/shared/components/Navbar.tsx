import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <header className="w-full h-[15vh] bg-blue-950 flex justify-between items-center pl-10 pr-10">
      <section title="Logo" className="">
        Hire<span>Flow</span>
      </section>
      <section className="flex justify-between w-[85%]">
        <nav className="border2 border-red w-[35%] flex justify-between">
          <NavLink to="">Home</NavLink>
          <NavLink to="">About</NavLink>
          <NavLink to=""></NavLink>
        </nav>
        <section className="flex gap-6">
          <button>Signup</button>
          <button>Login</button>
        </section>
      </section>
    </header>
  );
};

export default Navbar;
