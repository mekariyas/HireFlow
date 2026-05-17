const steps = [
  {
    title: "Create an Account",
    description:
      "Sign up as a job seeker, freelancer, or company in just a few seconds.",
    icon: "👤",
  },
  {
    title: "Browse or Post Jobs",
    description:
      "Explore jobs across tech, construction, real estate, and more—or post your own job listing.",
    icon: "🔎",
  },
  {
    title: "Connect Instantly",
    description:
      "Apply to jobs or get contacted directly by employers and clients.",
    icon: "🤝",
  },
  {
    title: "Get Hired or Hire",
    description:
      "Complete the hiring process smoothly and start working immediately.",
    icon: "🚀",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-20 px-6 bg-white">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          How It Works
        </h2>
        <p className="text-gray-500 mt-3">
          A simple process to connect talent with opportunities across all industries.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={i}
            className="border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition bg-gray-50"
          >
            <div className="text-4xl mb-4">{step.icon}</div>

            <h3 className="font-semibold text-lg mb-2">
              {step.title}
            </h3>

            <p className="text-sm text-gray-600">
              {step.description}
            </p>

            <div className="mt-4 text-blue-500 font-bold">
              0{i + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;