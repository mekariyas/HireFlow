import { useNavigate } from "react-router";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "../../components/ui/native-select";

import { Field, FieldDescription, FieldLabel } from "../../components/ui/field";
import { Textarea } from "../../components/ui/textarea";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full flex items-center pt-20 pb-20 justify-center">
      <Card className="w-full md:w-[30%] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-extrabold">
            Company Sign Up
          </CardTitle>
          <CardDescription>Create Your Company's Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="company name">Company Name</Label>
                <Input type="text" placeholder="Deloitte" required />
              </div>
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
              <div className="grid gap-2">
                <Label htmlFor="profileImg">Profile Photo (optional)</Label>
                <Input type="file" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="niche">Niche</Label>
                <NativeSelect defaultValue="" required>
                  <NativeSelectOption value="" disabled>
                    Select a niche
                  </NativeSelectOption>

                  <NativeSelectOption value="Tech">Tech</NativeSelectOption>
                  <NativeSelectOption value="Health">Health</NativeSelectOption>
                  <NativeSelectOption value="Marketing">
                    Marketing
                  </NativeSelectOption>
                  <NativeSelectOption value="Construction">
                    Construction
                  </NativeSelectOption>
                  <NativeSelectOption value="Real Estate">
                    Real Estate
                  </NativeSelectOption>
                  <NativeSelectOption value="Accounting and Finance">
                    Accounting and Finance
                  </NativeSelectOption>
                  <NativeSelectOption value="Education">
                    Education
                  </NativeSelectOption>
                  <NativeSelectOption value="Design and Creative">
                    Design and Creative
                  </NativeSelectOption>
                  <NativeSelectOption value="Customer Support">
                    Customer Support
                  </NativeSelectOption>
                  <NativeSelectOption value="Sales">Sales</NativeSelectOption>
                </NativeSelect>
              </div>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
                <FieldDescription>
                  Briefly describe the Company.
                </FieldDescription>
                <Textarea
                  maxLength={300}
                  id="textarea-message"
                  placeholder="Describe your company."
                  required
                />
              </Field>
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
              <p>Already have an Account?</p>
            </CardContent>

            <CardAction>
              <Button
                variant="link"
                className="text-blue-950 text-lg font-extrabold cursor-pointer"
                onClick={() => navigate("/companies/login")}
              >
                Login
              </Button>
            </CardAction>
          </section>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Signup;
