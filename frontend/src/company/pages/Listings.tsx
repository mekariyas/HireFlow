import { AxiosError } from "axios";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import { Button } from "../../components/ui/button";
import type { IJob } from "../types/company-types";
import ErrorComponent from "../../shared/components/Error";
import Spinner from "../../shared/components/Loading";
import api from "../../api/axios";

const Listings = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { error, isLoading, data } = useQuery({
    queryKey: ["listingInfo", companyId],
    queryFn: () => api.get(`/company/${companyId}/listings`),
  });

  if (isLoading) return <Spinner />;

  if (error instanceof AxiosError) {
    return (
      <ErrorComponent
        error={
          error.response?.data.message ?? "Unknown error, please try again"
        }
      />
    );
  }
  if (error instanceof Error) {
    return <ErrorComponent error={error.message} />;
  }
  console.log(data);
  return (
    <section className="w-full flex flex-col gap-4 items-center mb-10">
      <section className="mb-8 mt-6">
        <h1 className="text-3xl font-bold text-center">Your posts</h1>
      </section>
      <section className="w-[80%]">
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-4 pb-10 pl-4 pr-4 lg:rounded-lg lg:shadow-sm/10"
        >
          {data?.data.jobs.map((job: IJob) => (
            <AccordionItem key={job.id} value={job.id.toString()}>
              <AccordionTrigger className="w-full">
                <h2 className="text-center text-lg font-bold">{job.title}</h2>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-6 pb-4">
                <p>{job.description}</p>
                <section className="w-full mt-8 flex flex-col gap-6 lg:flex-row items-center justify-around font-bold">
                  <Button
                    className="h-10 bg-green-800 font-bold text-lg text-white cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/companies/${companyId}/dashboard/listings/applicants?jobId=${job.id}`,
                      )
                    }
                  >
                    View Applicants
                  </Button>
                  <Button className="w-30 h-10 bg-yellow-600 font-bold text-lg text-black cursor-pointer">
                    Edit Post
                  </Button>
                  <Button className="w-30 h-10 bg-red-800 font-bold text-lg text-white cursor-pointer">
                    Delete Post
                  </Button>
                </section>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </section>
  );
};
export default Listings;
