const VALUES = [
  {
    icon: "🤝",
    title: "People First",
    desc: "We believe every person deserves a job that fits their life — not the other way around.",
  },
  {
    icon: "🔍",
    title: "Transparency",
    desc: "No hidden fees, no opaque algorithms. Job seekers and employers always know where they stand.",
  },
  {
    icon: "⚡",
    title: "Speed & Simplicity",
    desc: "From posting to hiring, we remove friction at every step so you can focus on what matters.",
  },
  {
    icon: "🌍",
    title: "Inclusive Opportunity",
    desc: "We're building a platform where talent from anywhere can compete fairly for great roles.",
  },
];

const MILESTONES = [
  { year: "2022", event: "HireFlow founded with a simple idea: job searching should be easier." },
  { year: "2023", event: "Launched our first version, reaching 1,000 job postings in the first month." },
  { year: "2024", event: "Crossed 10,000 active employers and expanded into remote-first hiring." },
  { year: "2025", event: "Reached 200,000 candidates and launched company profiles & analytics." },
];

const About = () => {
  return (
    <main className="w-full flex flex-col bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
            Our Story
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Built for the way <span className="text-indigo-600">people work today</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            HireFlow was born out of frustration with clunky job boards and slow hiring processes.
            We set out to build something better — a platform that respects both candidates' time and employers' needs.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-4">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">🎯</div>
          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-gray-500 leading-relaxed">
            To make hiring and job searching effortless for everyone — whether you're a
            startup posting your first role or a professional looking for your next big move.
            We're building the most intuitive job platform on the market.
          </p>
        </div>
        <div className="bg-indigo-600 rounded-2xl p-8 flex flex-col gap-4">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-xl">🔭</div>
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-indigo-200 leading-relaxed">
            A world where the right person always finds the right opportunity — regardless of
            background, location, or network. We want to make talent mobility frictionless and fair for everyone.
          </p>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="w-full bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-1">How we got here</p>
            <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
          </div>
          <div className="flex flex-col gap-0">
            {MILESTONES.map(({ year, event }, i) => (
              <div key={year} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {year.slice(2)}
                  </div>
                  {i < MILESTONES.length - 1 && (
                    <div className="w-0.5 h-10 bg-indigo-100 my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-semibold text-indigo-500 mb-1">{year}</p>
                  <p className="text-gray-700 leading-relaxed">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-1">What drives us</p>
          <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {VALUES.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex gap-4 items-start">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-indigo-600">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-extrabold text-white">Join the HireFlow community</h2>
          <p className="text-indigo-200">
            Thousands of companies and candidates already trust HireFlow. Come see what the fuss is about.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/signup" className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
              Get Started Free
            </a>
            <a href="/pricing" className="border border-indigo-400 text-white font-bold px-8 py-3 rounded-xl hover:border-white transition-colors">
              View Pricing
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;