import { AxiosError } from "axios";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import type { IJob } from "../types/company-types";
import ErrorComponent from "../../shared/components/Error";
import Spinner from "../../shared/components/Loading";
import api from "../../api/axios";

const Listings = () => {
  const { companyId } = useParams();

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
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-center">Your posts</h1>
      </section>
      <section className="w-[80%]">
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-4 pb-10"
      >
        {data?.data.jobs.map((job: IJob) => (
          <AccordionItem key={job.id} value={job.id.toString()}>
            <AccordionTrigger className="text-center w-full">{job.title}</AccordionTrigger>
            <AccordionContent>
              <p>{job.description}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </section>
    </section>
  );
};
export default Listings;
