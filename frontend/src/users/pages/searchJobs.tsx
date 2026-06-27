import { AxiosError } from "axios";
{
  /*import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";*/
}

import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  NativeSelect,
  NativeSelectOption,
} from "../../components/ui/native-select";
import { toast } from "sonner";

import { useForm, type SubmitHandler } from "react-hook-form";

import type { IsearchJobs } from "../types/user-types";

//axios instance
import api from "../../api/axios";

const SearchJobs = () => {
  const { register, handleSubmit } = useForm<IsearchJobs>();
  const searchMutation = useMutation({
    mutationFn: async ({
      title,
      locationType,
      jobType,
    }: {
      title?: string;
      locationType?: string;
      jobType?: string;
    }) => {
      return await api.post(
        "/user/searchJob",
        { title, locationType, jobType },
        {},
      );
    },
  });
  const handleJobSearch: SubmitHandler<IsearchJobs> = async (data) => {
    try {
      searchMutation.mutate({
        title: data.title,
        locationType: data.locationType,
        jobType: data.jobType,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast(error.response?.data.message);
      }
      if (error instanceof Error) {
        return toast(error.message);
      }
    }
  };
  return (
    <section className="w-full flex flex-col pt-4 pb-4">
      <form
        className="flex flex-col lg:flex-row gap-4"
        onSubmit={handleSubmit(handleJobSearch)}
      >
        <Label htmlFor="title">Job Title</Label>
        <Input
          type="text"
          placeholder="Search Job Title"
          {...register("title")}
        />
        <Label htmlFor="locationType">Location:</Label>
        <NativeSelect {...register("locationType")}>
          <NativeSelectOption value="" disabled>
            Select location type
          </NativeSelectOption>

          <NativeSelectOption value="Remote">Remote</NativeSelectOption>

          <NativeSelectOption value="Hybrid">Hybrid</NativeSelectOption>

          <NativeSelectOption value="On-site">On-Site</NativeSelectOption>
        </NativeSelect>
        <Label htmlFor="location">Job Type:</Label>
        <NativeSelect {...register("jobType")}>
          <NativeSelectOption value="" disabled>
            Select job type
          </NativeSelectOption>

          <NativeSelectOption value="Full-time">Full-time</NativeSelectOption>

          <NativeSelectOption value="Part-time">Part-time</NativeSelectOption>

          <NativeSelectOption value="Contract">Contract</NativeSelectOption>

          <NativeSelectOption value="Internship">Internship</NativeSelectOption>
        </NativeSelect>
        <Button type="submit"></Button>
      </form>
      {/* { searchMutation.data && (<Jobs jobs={searchMutation.data.data}/>)} */}
    </section>
  );
};

export default SearchJobs;
