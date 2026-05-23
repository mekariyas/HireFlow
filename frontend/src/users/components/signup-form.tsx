import { useState } from "react";

import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

import { Input } from "../../components/ui/input";

import { Label } from "../../components/ui/label";

import {

  NativeSelect,

  NativeSelectOption,

} from "../../components/ui/native-select";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";


const SignUpForm = () => {
  
  const [date, setDate] = useState<Date>();
  return (
    <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first name">First Name</Label>
                <Input
                  type="text"
                  placeholder="John"
                  required
                  className="required:border-red-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Last name">Last Name</Label>
                <Input
                  type="text"
                  placeholder="Doe"
                  required
                  className="required:border-red-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Last name">Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-900 text-white">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="required:border-red-500"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="required:border-red-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Last name">Skills</Label>
                <Input
                  type="text"
                  placeholder="Eg:- front end development, sales marketer etc"
                  required
                  className="required:border-red-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cv">CV (Pdf)</Label>
                <Input
                  type="file"
                  required
                  className="required:border-red-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profileImg">Profile Photo (optional)</Label>
                <Input type="file" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="niche">Niche</Label>
                <NativeSelect
                  defaultValue=""
                  required
                  className="required:border-red-500"
                >
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
              <Button
              type="submit"
              className="w-[80%] text-lg font-bold bg-slate-950 text-white rounded-md cursor-pointer"
            >
              Sign Up
            </Button>
            </div>
            
          </form>
  )
}

export default SignUpForm