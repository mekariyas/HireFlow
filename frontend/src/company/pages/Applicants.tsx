import { AxiosError } from "axios";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

import ErrorComponent from "../../shared/components/Error";
import Spinner from "../../shared/components/Loading";

import api from "../../api/axios";
import type { IApplication } from "../types/company-types";

const Applicants = () => {
  const [searchParams] = useSearchParams();

  const { error, isLoading, data } = useQuery({
    queryKey: ["listingInfo", searchParams.get("jobId")],
    //jobs/:jobId/applications
    queryFn: () =>
      api.get(`/company/jobs/${searchParams.get("jobId")}/applications`),
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (error instanceof AxiosError) {
    return <ErrorComponent error={error.response?.data.message} />;
  }
  if (error instanceof Error) {
    return <ErrorComponent error={error.message} />;
  }
  console.log(data);

  const getDownloadUrl = (url: string) => {
    return url.replace("/upload/", "/upload/fl_attachment/");
  };
  return (
    <section className="w-full flex flex-col gap-4 items-center mb-10">
      <section className="mb-8 mt-6">
        <h1 className="text-3xl font-bold text-center">Your posts</h1>
      </section>
      <section className="w-[80%]">
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-4 pb-10 pl-4 pr-4 lg:rounded-lg lg:shadow-sm/10 decoration-0"
        >
          {data?.data.applications.map((application: IApplication) => {
            return (
              <AccordionItem
                key={application.id}
                value={application.id.toString()}
              >
                <AccordionTrigger className="w-full">
                  <section className="w-full h-[10vh] flex gap-4">
                    <Avatar>
                      <AvatarImage
                        src={application.profileURL}
                        alt={`${application.firstName}'s Photo`}
                        className="grayscale object-cover"
                      />
                      <AvatarFallback className="font-bold">
                        {application.firstName[0].toUpperCase()}{" "}
                        {application.lastName[0].toLowerCase()}
                      </AvatarFallback>
                    </Avatar>
                    <section className="w-[80%]">
                      <p>
                        {application.firstName} {application.lastName}
                      </p>
                      <p>skills: {application.skills}</p>
                    </section>
                  </section>
                </AccordionTrigger>
                <AccordionContent>
                  <section className="w-[80%] decoration-0 flex justify-center gap-10 items-center">
                    <a
                      href={getDownloadUrl(application.cvUrl)}
                      className="w-40 h-10 bg-blue-950 flex items-center justify-center rounded-lg cursor-pointer text-white font-bold"
                    >
                      {" "}
                      Download Resume
                    </a>
                    <a
                      href={application.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-40 h-10  bg-gray-700 flex items-center justify-center rounded-lg cursor-pointer text-white font-bold"
                    >
                      View Resume
                    </a>
                  </section>
                  <section className="w-full flex flex-col items-end-safe lg:flex-row lg:justify-end-safe gap-4 lg:items-center">
                    {/* <p>Applied at: {application.createdAt}</p> */}
                    <p className="">
                      Status:{" "}
                      <span
                        className={`font-semibold ${application.status == "pending" ? "text-green-600" : application.status == "rejected" ? "text-red-600" : ""}`}
                      >
                        {application.status}
                      </span>
                    </p>
                  </section>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
    </section>
  );
};

export default Applicants;
