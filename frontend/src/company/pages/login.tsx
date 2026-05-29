import { useNavigate } from "react-router";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full flex items-center pt-20 pb-20 justify-center">
      <Card className="w-full md:w-[30%] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-extrabold">
            Company Log in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <CardAction className="w-full flex justify-center">
            <Button
              type="submit"
              className="w-[80%] text-lg font-bold bg-slate-950 text-white rounded-md cursor-pointer"
            >
              Sign Up
            </Button>
          </CardAction>
          <section className="flex justify-between items-center pl-2 pr-2">
            <CardContent>
              <p>Don't have an Account?</p>
            </CardContent>

            <CardAction>
              <Button
                variant="link"
                className="text-blue-950 text-lg font-extrabold cursor-pointer"
                onClick={() => navigate("/companies/signup")}
              >
                Sign up
              </Button>
            </CardAction>
          </section>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Login;
