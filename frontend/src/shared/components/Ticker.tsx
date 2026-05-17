import MarqueeText from "react-marquee-text"

const jobs = [
  "Frontend Developer",
  "Backend Engineer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Real Estate Agent",
  "Sales Representative",
  "Construction Contractor",
  "Electrician",
  "Plumber",
  "Graphic Designer",
  "Marketing Specialist",
  "Social Media Manager",
  "Customer Support Agent",
  "Virtual Assistant",
  "Accountant",
  "Project Manager",
  "Truck Driver",
  "Delivery Rider",
  "Fitness Trainer",
  "Photographer",
  "Video Editor",
  "Content Writer",
  "Cleaner",
  "Security Officer",
  "Remote React Developer",
  "Django Backend Developer",
  "Mobile App Developer",
  "Business Consultant",
  "Recruiter",
  "AI Engineer",
];

const Ticker = () => {
  return (
    <section className="py-3 flex items-center bg-black text-white overflow-hidden">
      <MarqueeText duration={50} pauseOnHover={true} playOnlyInView direction="right">
        {jobs.map((job, i) => (
          <span key={i} className="mx-8 text-lg font-semibold whitespace-nowrap">
            {job}
          </span>
        ))}
      </MarqueeText>
    </section>
  );
};

export default Ticker;