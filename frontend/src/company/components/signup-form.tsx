import { AxiosError } from "axios";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Eye, EyeClosed } from "lucide-react";
import {
  NativeSelect,
  NativeSelectOption,
} from "../../components/ui/native-select";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// type import
import type { ISignUp } from "../types/company-types";

import { Field, FieldDescription, FieldLabel } from "../../components/ui/field";
import { Textarea } from "../../components/ui/textarea";

//axios instance
import api from "../../api/axios";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //function for handling password visibility
  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSignUp: SubmitHandler<ISignUp> = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.set("name", data.name);
      formData.set("email", data.email);
      formData.set("password", data.password);
      formData.set("role", "company");
      formData.set("niche", data.niche);
      formData.set("description", data.description);
      formData.set("profileImg", data.profileImg ? data.profileImg[0] : "");
      console.log('creating profile')
      const signUp = await api.post("/company/signUp", formData, {
        withCredentials: true,
      });
      console.log(signUp);
      const { id } = signUp.data;
      navigate(`/companies/${id}/profile`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
        return setIsLoading(false)
        
      }
      if (error instanceof Error) {
        toast(error.message);
        return setIsLoading(false)
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="first name">Company Name</Label>
          <Input
            type="text"
            placeholder="Deloitte"
            {...register("name", { required: true, minLength: 3 })}
            className="required:border-red-500"
          />
          {errors.name && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: true, minLength: 3 })}
            className="required:border-red-500"
          />
          {errors.email && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="flex">
            <Input
              id="password"
              type={isVisible ? "text" : "password"}
              {...register("password", { required: true, minLength: 3 })}
              className="required:border-red-500"
            />
            <Button type="button" onClick={handleVisibility}>
              {isVisible ? <Eye /> : <EyeClosed />}
            </Button>
          </div>
          {errors.password && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profileImg">Profile Photo (optional)</Label>
          <Input type="file" {...register("profileImg")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="niche">Niche</Label>
          <NativeSelect
            defaultValue=""
            {...register("niche", { required: true })}
            className="w-full required:border-red-500"
          >
            <NativeSelectOption value="" disabled>
              Select a niche
            </NativeSelectOption>

            <NativeSelectOption value="Tech">Tech</NativeSelectOption>
            <NativeSelectOption value="Health">Health</NativeSelectOption>
            <NativeSelectOption value="Marketing">Marketing</NativeSelectOption>
            <NativeSelectOption value="Construction">
              Construction
            </NativeSelectOption>
            <NativeSelectOption value="Real Estate">
              Real Estate
            </NativeSelectOption>
            <NativeSelectOption value="Accounting and Finance">
              Accounting and Finance
            </NativeSelectOption>
            <NativeSelectOption value="Education">Education</NativeSelectOption>
            <NativeSelectOption value="Design and Creative">
              Design and Creative
            </NativeSelectOption>
            <NativeSelectOption value="Customer Support">
              Customer Support
            </NativeSelectOption>
            <NativeSelectOption value="Sales">Sales</NativeSelectOption>
          </NativeSelect>
          {errors.niche && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="grid gap-2">
          <Field className="grid gap-2">
            <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
            <FieldDescription>Briefly describe the Company.</FieldDescription>
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
        </div>
        <Button
          type="submit"
          className="w-full h-12 text-lg font-bold bg-slate-950 text-white rounded-md cursor-pointer"
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
