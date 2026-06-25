import { AxiosError } from "axios";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IJobForm } from "../types/company-types";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import {
  NativeSelect,
  NativeSelectOption,
} from "../../components/ui/native-select";
import { Field, FieldDescription, FieldLabel } from "../../components/ui/field";
import { Textarea } from "../../components/ui/textarea";
import api from "../../api/axios";
import { toast } from "sonner";

const JobForm = ({ ...props }: IJobForm & { children?: React.ReactNode }) => {
  const { companyId } = useParams();
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobForm>();

  const editJobMutation = useMutation({
    mutationFn: async ({
      jobId,
      title,
      description,
      jobType,
      location,
    }: {
      jobId: number;
      title?: string;
      description?: string;
      jobType?: string;
      location?: string;
    }) => {
      return await api.put(
        "/company/editJob",
        {
          jobId,
          title,
          description,
          jobType,
          location,
        },
        {
          withCredentials: true,
        },
      );
    },

    onSuccess: (response) => {
      toast(response.data.message);
      props.handleFormVisibility();
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      } else if (error instanceof Error) {
        toast(error.message);
      }
    },
  });

  const handleJobEdit: SubmitHandler<IJobForm> = (data) => {
    if (!props.jobId) {
      toast("Job ID is missing");
      return;
    }

    editJobMutation.mutate({
      jobId: props.jobId,
      title: data.title,
      description: data.description,
      jobType: data.jobType,
      location: data.location,
    });
  };

  const handleJobPost: SubmitHandler<IJobForm> = async (data) => {
    try {
      setIsPosting(true);

      const jobData = {
        title: data.title,
        description: data.description,
        location: data.location,
        jobType: data.jobType,
        companyId: companyId?.toString() || "",
      };

      const jobPost = await api.post("/company/postJob", jobData, {
        withCredentials: true,
      });

      toast(jobPost.data.message);
      props.handleFormVisibility();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      } else if (error instanceof Error) {
        toast(error.message);
      }
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <section
      className={`w-full pb-10 bg-white flex flex-col gap-4 items-center ${
        props.class ? props.class : "absolute z-10 mt-10"
      }`}
    >
      <form
        className="w-full lg:w-[45%] flex flex-col gap-4"
        onSubmit={
          props.editVisible
            ? handleSubmit(handleJobEdit)
            : handleSubmit(handleJobPost)
        }
      >
        <Label htmlFor="title">Title</Label>

        <Input
          type="text"
          defaultValue={props.title ?? ""}
          {...register("title", {
            required: true,
            minLength: 3,
          })}
        />

        {errors.title && (
          <span className="text-red-600">
            Title must be at least 3 characters
          </span>
        )}

        <Field className="grid gap-2">
          <FieldLabel htmlFor="textarea-message">Description</FieldLabel>

          <FieldDescription />

          <Textarea
            id="textarea-message"
            maxLength={2000}
            className="h-64"
            placeholder="Describe the job."
            defaultValue={props.description ?? ""}
            {...register("description", {
              required: true,
            })}
          />

          {errors.description && (
            <span className="text-red-600">Description is required</span>
          )}
        </Field>

        <Label htmlFor="location">Location</Label>

        <NativeSelect
          defaultValue={props.location ?? ""}
          {...register("location", {
            required: true,
          })}
        >
          <NativeSelectOption value="" disabled>
            Select location type
          </NativeSelectOption>

          <NativeSelectOption value="Remote">Remote</NativeSelectOption>

          <NativeSelectOption value="Hybrid">Hybrid</NativeSelectOption>

          <NativeSelectOption value="On-site">On-Site</NativeSelectOption>
        </NativeSelect>

        {errors.location && (
          <span className="text-red-600">Location is required</span>
        )}

        <Label htmlFor="jobType">Job Type</Label>

        <NativeSelect
          defaultValue={props.jobType ?? ""}
          {...register("jobType", {
            required: true,
          })}
        >
          <NativeSelectOption value="" disabled>
            Select job type
          </NativeSelectOption>

          <NativeSelectOption value="Full-time">Full-time</NativeSelectOption>

          <NativeSelectOption value="Part-time">Part-time</NativeSelectOption>

          <NativeSelectOption value="Contract">Contract</NativeSelectOption>

          <NativeSelectOption value="Internship">Internship</NativeSelectOption>
        </NativeSelect>

        {errors.jobType && (
          <span className="text-red-600">Job type is required</span>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-lg font-bold bg-slate-950 text-white rounded-md cursor-pointer"
          disabled={isPosting || editJobMutation.isPending}
        >
          {props.editVisible
            ? editJobMutation.isPending
              ? "Saving..."
              : "Save Edit"
            : isPosting
              ? "Posting..."
              : "Post"}
        </Button>
      </form>

      <Button
        type="button"
        className="w-full lg:w-[45%] h-12 text-lg font-bold bg-red-800 text-white rounded-md cursor-pointer"
        onClick={props.handleFormVisibility}
      >
        Cancel
      </Button>
    </section>
  );
};

export default JobForm;
