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
import LoginForm from "../components/login-form";

const Login = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full flex items-center pt-20 pb-20 justify-center">
      <Card className="w-full md:w-[30%] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-extrabold">User Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <section className="flex justify-between items-center pl-2 pr-2">
            <CardContent>
              <p>Don't have an Account?</p>
            </CardContent>

            <CardAction>
              <Button
                variant="link"
                className="text-blue-950 text-lg font-extrabold cursor-pointer"
                onClick={() => navigate("/user/signup")}
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
