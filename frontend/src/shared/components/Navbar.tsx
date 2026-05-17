import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <header className="w-full h-16 text-white bg-gray-900 shadow-2xl flex justify-between items-center px-10 sticky top-0 z-50">

        {/* Logo */}
        <NavLink to="/" className="text-xl font-extrabold tracking-tight">
          Hire<span className="text-indigo-400">Flow</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-indigo-400" : "hover:text-indigo-300 transition-colors"}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-indigo-400" : "hover:text-indigo-300 transition-colors"}>
            About Us
          </NavLink>
          <NavLink to="/pricing" className={({ isActive }) => isActive ? "text-indigo-400" : "hover:text-indigo-300 transition-colors"}>
            Pricing
          </NavLink>
          <div className="relative group">
            <span className="hover:text-indigo-300 transition-colors cursor-pointer">
              For Companies ▾
            </span>
            <div className="absolute top-8 left-0 w-40 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col">
              <NavLink to="/companies/signup" className="px-4 py-2.5 text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                Sign up
              </NavLink>
              <NavLink to="/companies/login" className="px-4 py-2.5 text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                Log in
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/user/signup" className="text-sm font-semibold hover:text-indigo-300 transition-colors">
            Sign up
          </NavLink>
          <NavLink to="/user/login" className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
            Log in
          </NavLink>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <span className="w-6 h-0.5 bg-white rounded" />
          <span className="w-6 h-0.5 bg-white rounded" />
          <span className="w-6 h-0.5 bg-white rounded" />
        </button>

      </header>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-72 bg-gray-900 text-white z-50 flex flex-col px-8 py-6 gap-8 shadow-2xl transition-transform duration-300 md:hidden ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Sidebar header */}
        <div className="flex justify-between items-center">
          <span className="text-xl font-extrabold tracking-tight">
            Hire<span className="text-indigo-400">Flow</span>
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Sidebar nav links */}
        <nav className="flex flex-col gap-6 text-sm font-medium">
          <NavLink to="/" onClick={() => setSidebarOpen(false)} className={({ isActive }) => isActive ? "text-indigo-400" : "hover:text-indigo-300 transition-colors"}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setSidebarOpen(false)} className={({ isActive }) => isActive ? "text-indActive-400" : "hover:text-indigo-300 transition-colors"}>
            About Us
          </NavLink>
          <NavLink to="/pricing" onClick={() => setSidebarOpen(false)} className={({ isActive }) => isActive ? "text-indigo-400" : "hover:text-indigo-300 transition-colors"}>
            Pricing
          </NavLink>

          {/* Companies submenu — always expanded in sidebar */}
          <div className="flex flex-col gap-3">
            <span className="text-gray-400 text-xs uppercase tracking-widest">For Companies</span>
            <NavLink to="/companies/signup" onClick={() => setSidebarOpen(false)} className="pl-3 hover:text-indigo-300 transition-colors">
              Sign up
            </NavLink>
            <NavLink to="/companies/login" onClick={() => setSidebarOpen(false)} className="pl-3 hover:text-indigo-300 transition-colors">
              Log in
            </NavLink>
          </div>
        </nav>

        {/* Sidebar auth buttons */}
        <div className="flex flex-col gap-3 mt-auto">
          <NavLink to="/signup" onClick={() => setSidebarOpen(false)} className="text-center text-sm font-semibold border border-indigo-500 hover:border-indigo-400 py-2.5 rounded-lg transition-colors">
            Sign up
          </NavLink>
          <NavLink to="/login" onClick={() => setSidebarOpen(false)} className="text-center text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded-lg transition-colors">
            Log in
          </NavLink>
        </div>

      </aside>
    </>
  );
};

export default Navbar;