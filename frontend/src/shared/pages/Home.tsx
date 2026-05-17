import Ticker from "../components/Ticker.tsx";
import Categories from "../components/Categories.tsx";
import Stats from "../components/Stats.tsx";
import HowItWorks from "../components/HowItWorks.tsx";

const Home = () => {
  return (
    <>
      <main className="w-full flex flex-col bg-gray-200">
        <section className="w-full lg:h-screen flex flex-col flex-wrap md:flex-row justify-between">
          <section className="w-full min-h-screen flex flex-col lg:flex-row justify-between items-center px-6 py-10 bg-gradient-to-b from-gray-100 to-gray-200">

  {/* LEFT SIDE */}
  <section className="lg:w-[45%] flex flex-col items-center lg:items-start justify-center gap-6">

    <div className="flex flex-col gap-4 text-center lg:text-left">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
        The Best Place to Find & Hire{" "}
        <span className="text-blue-600">Top Talent</span>
      </h1>

      <p className="text-gray-600 font-medium">
        Discover skilled professionals or post jobs across tech, services, and freelance niches.
      </p>
    </div>

    {/* SEARCH BAR (IMPORTANT UPGRADE) */}
    <div className="w-full flex gap-2">
      <input
        className="w-full px-4 py-3 rounded-lg border bg-white focus:outline-none"
        placeholder="Search jobs, skills, or categories..."
      />
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold">
        Search
      </button>
    </div>

    {/* CTA BUTTONS */}
    <div className="flex gap-3">
      <button className="px-5 py-2 border rounded-lg font-medium hover:bg-gray-100">
        Find Jobs
      </button>
      <button className="px-5 py-2 bg-black text-white rounded-lg font-medium">
        Post a Job
      </button>
    </div>

    {/* TRUST LINE */}
    <p className="text-sm text-gray-500">
      🔥 New jobs added daily across multiple industries
    </p>

  </section>

  {/* RIGHT SIDE (VISUAL UPGRADE) */}
  <section className="lg:w-[45%] relative flex items-center justify-center">

    <div className="grid gap-4 w-full max-w-md">

      {[
        "Frontend Developer",
        "Real Estate Agent",
        "Electrician",
        "UI/UX Designer",
        "DevOps Engineer"
      ].map((job, i) => (
        <div
          key={i}
          className="bg-white border shadow-sm rounded-xl p-4 font-medium hover:shadow-md transition"
          style={{
            transform: `translateX(${i * 12}px)`
          }}
        >
          💼 {job}
        </div>
      ))}

    </div>

    {/* floating badge */}
    <div className="absolute top-0 right-10 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
      Live Hiring
    </div>

  </section>

</section>
        </section>

        <Ticker />

        <Categories />

        <Stats/>

        <HowItWorks />

      </main>
    </>
  );
};

export default Home;
