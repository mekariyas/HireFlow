import { AxiosError } from "axios";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { CardAction } from "../../components/ui/card";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { type ISignIn } from "../types/company-types";

import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../api/axios";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>();

  const navigate = useNavigate();

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogIn: SubmitHandler<ISignIn> = async (data) => {
    try {
      setIsLoading(true);
      const logIn = await api.post(
        "/company/logIn",
        { email: data.email, password: data.password },
        { withCredentials: true },
      );
      const { id } = logIn.data;
      navigate(`/companies/${id}/dashboard`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
        return setIsLoading(false);
      }
      if (error instanceof Error) {
        toast(error.message);
        return setIsLoading(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogIn)}>
      <div className="flex flex-col gap-6">
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

        <CardAction className="w-full flex justify-center">
          <Button
            type="submit"
            className="w-[95%] h-10 text-lg font-bold bg-slate-950 text-white rounded-md cursor-pointer"
            disabled={isLoading}
          >
            Login
          </Button>
        </CardAction>
      </div>
    </form>
  );
};

export default LoginForm;
