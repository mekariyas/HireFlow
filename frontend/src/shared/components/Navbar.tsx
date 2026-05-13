import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <header className="w-full h-[10vh] backdrop-blur-sm backdrop-contrast-50 flex justify-between items-center pl-10 pr-10 sticky top-0 z-4">
      <section title="Logo" className="">
        Hire<span>Flow</span>
      </section>
      <section className="flex justify-between w-[85%]">
        <nav className="border2 border-red w-[35%] flex justify-between text-white">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="" className="group relative">For Companies
            <section className="text-black group-hover:flex transition-all group-hover:flex-col justify-around lg:w-40 lg:h-[15vh] hidden bg-white absolute top-6 w-30 rounded-sm items-center">
              <NavLink to="/companies/signup">Sign up</NavLink>
              <NavLink to="/companies/login">Log in</NavLink>
            </section>
          </NavLink>
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
