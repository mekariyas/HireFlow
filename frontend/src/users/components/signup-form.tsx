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
import type { ISignUp } from "../types/user-types";

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
      formData.set("first_name", data.firstName);
      formData.set("last_name", data.lastName);
      formData.set("email", data.email);
      formData.set("password", data.password);
      formData.set("skills", data.skills);
      formData.set("cv", data.cv[0]);
      formData.set("role", "user");
      formData.set("niche", data.niche);
      formData.set("profileImg", data.profileImg ? data.profileImg[0] : "");

      const signUp = await api.post("/user/signUp", formData, {
        withCredentials: true,
      });
      const { id } = signUp.data;
      navigate(`/user/${id}/profile`);
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
      if (error instanceof AxiosError) {
        toast(error.message);
      }
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="first name">First Name</Label>
          <Input
            type="text"
            placeholder="John"
            {...register("firstName", { required: true, minLength: 3 })}
            className="required:border-red-500"
          />
          {errors.firstName && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Last name">Last Name</Label>
          <Input
            type="text"
            placeholder="Doe"
            {...register("lastName", { required: true, minLength: 3 })}
            className="required:border-red-500"
          />
          {errors.lastName && (
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
          <Label htmlFor="skills">Skills</Label>
          <Input
            type="text"
            placeholder="Eg:- front end development, sales marketer etc"
            {...register("skills", { required: true, minLength: 3 })}
            className="required:border-red-500"
          />
          {errors.skills && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cv">CV (Pdf)</Label>
          <Input
            type="file"
            {...register("cv", { required: true })}
            className="required:border-red-500"
          />
          {errors.cv && (
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
        <Button
          type="submit"
          className="w-[100%] h-12 text-lg font-bold bg-slate-950 text-white rounded-md cursor-pointer"
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
