import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import type { Ijobs } from "../types/user-types";

const Jobs = ({ jobs }: { jobs: Ijobs[] }) => {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <p className="font-semibold text-gray-700">No jobs found</p>
        <p className="text-sm text-gray-400">
          Try adjusting your search filters
        </p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="flex flex-col gap-3 mt-6">
      {jobs.map((job) => (
        <AccordionItem
          key={job.id}
          value={`job-${job.id}`}
          className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-200 px-5"
        >
          {/* Collapsed — title, company name, avatar */}
          <AccordionTrigger className="flex items-center gap-4 py-4 hover:no-underline">
            <Avatar className="w-10 h-10 rounded-xl shrink-0">
              <AvatarImage src={job.profileURL} alt={job.name} />
              <AvatarFallback className="rounded-xl bg-indigo-100 text-indigo-600 font-bold text-sm">
                {job.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 text-left">
              <p className="font-bold text-gray-900 text-sm leading-snug truncate">
                {job.title}
              </p>
              <p className="text-xs text-indigo-600 font-medium mt-0.5">
                {job.name}
              </p>
            </div>
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full shrink-0 capitalize">
              {job.jobType}
            </span>
          </AccordionTrigger>

          {/* Expanded — full details */}
          <AccordionContent className="flex flex-col gap-4 pb-5">
            <p className="text-sm text-gray-500 leading-relaxed">
              {job.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"
                  />
                  <circle cx="12" cy="11" r="3" />
                </svg>
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 6v6l4 2" />
                </svg>
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <button className="self-start text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg transition-colors">
              Apply Now
            </button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Jobs;
