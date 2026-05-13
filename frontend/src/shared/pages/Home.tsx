import Ticker from "../components/Ticker.tsx";
import Categories from "../components/Categories.tsx";
import Stats from "../components/Stats.tsx";
const Home = () => {
  return (
    <>
      <main>
        <section className="w-full h-screen flex justify-between">
          <section className="border-2 lg:w-[45%] flex flex-col items-center justify-center gap-2">
            <section className="border-2 h-[60%] w-[90%] flex justify-center gap-4 flex-col items-center">
              <h1 className="text-5xl font-bold text-center text-wrap">The best place to find and hire top talent</h1>
              <p>Most Talented Employees and World Class Companies Here</p>
            </section>
            <section className="border-2 h-[15%] w-[90%]"></section>
          </section>
          <section className="lg:w-[45%] border-2"></section>
        </section>
        <Ticker/>
        <Categories/>
        <Stats/>
        <section>
        </section>
      </main>
    </>
  );
};

export default Home;
