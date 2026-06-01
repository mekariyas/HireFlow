import { useParams } from "react-router";

import {
   Avatar,
  AvatarImage,
  AvatarFallback
} from "../../components/ui/avatar"

const Profile = () => {
  const { userId, companyId }  = useParams();
  return (
    <section className="w-full h-[100vh]">
      <section className="w-full flex flex-col justify-around gap-3 items-center pt-10 border-red-600">
        <Avatar className="border-[0.2px] w-40 h-40">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale object-cover"       
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <section className="w-[30%] flex flex-col items-center">
          <p>Name</p>
        <section>
          <p>Skills</p>
        </section>
        <section>
          <p>Company Description</p>
        </section>
        </section>
      </section>
    </section>
  );
};

export default Profile;
