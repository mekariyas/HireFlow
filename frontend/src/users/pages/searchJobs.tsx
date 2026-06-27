import { AxiosError } from "axios";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "../../components/ui/native-select";
import { toast } from "sonner";
import Jobs from "../components/Jobs";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { IsearchJobs } from "../types/user-types";
import api from "../../api/axios";

const SearchJobs = () => {
  const [params, setParams] = useState<IsearchJobs | null>(null);
  const { register, handleSubmit } = useForm<IsearchJobs>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobSearch", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.title) searchParams.set("title", params.title);
      if (params?.locationType)
        searchParams.set("locationType", params.locationType);
      if (params?.jobType) searchParams.set("jobType", params.jobType);
      return await api.get(`/user/searchJob?${searchParams.toString()}`);
    },
    enabled: !!params, // only runs when params are set
  });

  const handleJobSearch: SubmitHandler<IsearchJobs> = (data) => {
    setParams(data);
  };

  if (error instanceof AxiosError) {
    toast(error.response?.data.message ?? "Something went wrong");
  }

  return (
    <section className="w-full flex flex-col pt-4 pb-4">
      <form
        className="flex flex-col lg:flex-row gap-4 items-end"
        onSubmit={handleSubmit(handleJobSearch)}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="e.g. React Developer"
            {...register("title")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="locationType">Location Type</Label>
          <NativeSelect id="locationType" {...register("locationType")}>
            <NativeSelectOption value="" disabled>
              Select location
            </NativeSelectOption>
            <NativeSelectOption value="Remote">Remote</NativeSelectOption>
            <NativeSelectOption value="Hybrid">Hybrid</NativeSelectOption>
            <NativeSelectOption value="On-site">On-Site</NativeSelectOption>
          </NativeSelect>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="jobType">Job Type</Label>
          <NativeSelect id="jobType" {...register("jobType")}>
            <NativeSelectOption value="" disabled>
              Select job type
            </NativeSelectOption>
            <NativeSelectOption value="Full-time">Full-time</NativeSelectOption>
            <NativeSelectOption value="Part-time">Part-time</NativeSelectOption>
            <NativeSelectOption value="Contract">Contract</NativeSelectOption>
            <NativeSelectOption value="Internship">
              Internship
            </NativeSelectOption>
          </NativeSelect>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search Jobs"}
        </Button>
      </form>

      {/* Results */}
      {data?.data?.jobs && <Jobs jobs={data.data.jobs} />}
    </section>
  );
};

export default SearchJobs;
