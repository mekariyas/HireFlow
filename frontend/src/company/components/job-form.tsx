import { AxiosError } from "axios";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IJobForm } from "../types/company-types";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useParams } from "react-router";
import {
  NativeSelect,
  NativeSelectOption,
} from "../../components/ui/native-select";
import { Field, FieldDescription, FieldLabel } from "../../components/ui/field";
import { Textarea } from "../../components/ui/textarea";

import api from "../../api/axios";
import { toast } from "sonner";
const JobForm = ({
  handleFormVisibility,
}: {
  handleFormVisibility: () => void;
}) => {
  const { companyId } = useParams();
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobForm>();

  const handleJobPost: SubmitHandler<IJobForm> = async (data) => {
    try {
      setIsPosting(true);
      const formData = new FormData();
      formData.set("title", data.title);
      formData.set("description", data.description);
      formData.set("location", data.location);
      formData.set("jobType", data.jobType);
      formData.set("companyId", companyId?.toString() || "");
      const jobPost = await api.post("/company/postJob", formData, {
        withCredentials: true,
      });
      toast(jobPost.data.data.message);
      setIsPosting(false);
      handleFormVisibility();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
        return setIsPosting(false);
      }
      if (error instanceof Error) {
        toast(error.message);
        return setIsPosting(false);
      }
    }
  };
  return (
    <section className="w-full pb-10 bg-white flex flex-col gap-4 items-center absolute z-[10] mt-10">
      <form
        className="w-full lg:w-[45%] flex flex-col gap-4"
        onSubmit={handleSubmit(handleJobPost)}
      >
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          {...register("title", { required: true, minLength: 3 })}
        />
        {errors.title && (
          <span className="text-red-600">This field is required</span>
        )}
        <Field className="grid gap-2">
          <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
          <FieldDescription></FieldDescription>
          <Textarea
            maxLength={2000}
            id="textarea-message"
            placeholder="Describe your company."
            className="h-64"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-600">This field is required</span>
          )}
        </Field>
        <Label htmlFor="location">Location</Label>
        <NativeSelect
          defaultValue=""
          {...register("location", { required: true })}
          className="w-full required:border-red-500"
        >
          <NativeSelectOption value="" disabled>
            Select location type
          </NativeSelectOption>

          <NativeSelectOption value="Remote">Remote</NativeSelectOption>
          <NativeSelectOption value="Hybrid">Hybrid</NativeSelectOption>
          <NativeSelectOption value="On-site">On-Site</NativeSelectOption>
        </NativeSelect>
        {errors.location && (
          <span className="text-red-600">This field is required</span>
        )}
        <Label htmlFor="location">Job Type</Label>
        <NativeSelect
          defaultValue=""
          {...register("jobType", { required: true })}
          className="w-full required:border-red-500"
        >
          <NativeSelectOption value="" disabled>
            Select job type
          </NativeSelectOption>

          <NativeSelectOption value="Remote">Full-time</NativeSelectOption>
          <NativeSelectOption value="Hybrid">Part-time</NativeSelectOption>
          <NativeSelectOption value="On-site">Contract</NativeSelectOption>
          <NativeSelectOption value="On-site">Internship</NativeSelectOption>
        </NativeSelect>
        {errors.jobType && (
          <span className="text-red-600">This field is required</span>
        )}
        <Button
          type="submit"
          className="w-full h-12 text-lg font-bold bg-slate-950 text-white rounded-md cursor-pointer"
          disabled={isPosting}
        >
          Post
        </Button>
      </form>
      <Button
        type="button"
        className="w-full lg:w-[45%] h-12 text-lg font-bold bg-red-950 text-white rounded-md cursor-pointer"
        onClick={handleFormVisibility}
      >
        Cancel
      </Button>
    </section>
  );
};

export default JobForm;
