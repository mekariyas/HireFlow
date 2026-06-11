import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { AxiosError } from "axios";
import api from "../../api/axios";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import ErrorComponent from "../../shared/components/Error";
import Spinner from "../../shared/components/Loading";

import type { Ijobs } from "../types/user-types";

const Jobs = () => {
  const { userId } = useParams();

  const { error, isLoading, data } = useQuery({
    queryKey: ["jobsInfo", userId],
    queryFn: () =>
      api.get(`/user/${userId}/getJobs`, { withCredentials: true }),
  });

  const apply = useMutation({
    mutationFn: (jobId: number) => handleApplication(jobId),
  });

  const handleApplication = async (jobId: number) => {
    try {
      const apply = await api.post(
        `user/jobs/${jobId}/apply`,
        { userId },
        { withCredentials: true },
      );
      toast(apply.data.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        toast(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast(error.message || "Unknown error, please try again");
      }
    }
  };

  if (error instanceof AxiosError) {
    return (
      <ErrorComponent
        error={
          error.response?.data.message || "Unknown Error. Please try again."
        }
      />
    );
  }

  if (error instanceof Error) {
    return <ErrorComponent error={error.message} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Recommended Jobs</h1>

        <p className="text-muted-foreground mt-2">
          Explore opportunities tailored for you.
        </p>
      </section>

      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-4 pb-10"
      >
        {data?.data.jobs.map((job: Ijobs) => (
          <AccordionItem
            key={job.id}
            value={String(job.id)}
            className="border rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline">
              <section className="flex flex-col sm:flex-row sm:items-center gap-4 w-full text-left">
                <Avatar className="border">
                  <AvatarImage src={job.profileURL} alt={job.name} />

                  <AvatarFallback className="font-bold">
                    {job.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <section className="flex-1">
                  <h2 className="text-lg md:text-xl font-bold">{job.title}</h2>

                  <p className="text-muted-foreground">{job.name}</p>
                </section>

                <section className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-secondary text-sm">
                    {job.location}
                  </span>

                  {job.jobType && (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-sm">
                      {job.jobType}
                    </span>
                  )}
                </section>
              </section>
            </AccordionTrigger>

            <AccordionContent className="pb-4">
              <section className="px-5 pb-2 border-t">
                <section className="pt-5 space-y-4">
                  <section>
                    <h3 className="font-semibold mb-2">Job Description</h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </section>

                  <button
                    className={`
                      w-full sm:w-auto
                      px-6 py-3
                      rounded-lg
                      font-medium
                      hover:opacity-90
                      transition
                      cursor-pointer
                      ${apply.isPending && "bg-gray-400 text-black"}
                      bg-slate-900
                      text-white
                    `}
                    disabled={apply.isPending && true}
                    onClick={() => apply.mutate(job.id)}
                  >
                    {apply.isPending ? "Applying..." : "Apply Now"}
                  </button>
                </section>
              </section>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Jobs;
