import { AxiosError } from "axios";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
//import { saveAs } from "file-saver";

import Error from "../../shared/components/Error";
import Spinner from "../../shared/components/Loading";
import ViewCV from "../../shared/components/ViewCV";
import api from "../../api/axios";

const UserProfile = () => {
  const { userId } = useParams();
  const { error, isLoading, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => api.get(`/user/${userId}`),
  });
  if (isLoading) {
    return <Spinner />;
  }

  if (error instanceof AxiosError) {
    return (
      <Error
        error={
          error.response?.data.message || "Unknown Error, Please try again"
        }
      />
    );
  }

  if (error instanceof Error) {
    return <Error error={error.message} />;
  }

  if (data) {
    //const downloadName = data.data.CVurl.split("/").at(-1);
    return (
      <section className="w-full flex flex-col gap-2">
        <section className="w-full flex justify-center gap-3 items-center pt-10  border-2 border-red-600">
          <Avatar className="border-[0.2px] w-40 h-40">
            <AvatarImage
              src={data.data.profileURL}
              alt={`${data.data.firstName}'s Photo`}
              className="grayscale object-cover"
            />
            <AvatarFallback className="font-bold">
              {data.data.firstName[0]} {data.data.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <section className="w-[30%] flex flex-col items-center">
            <p className="font-bold text-lg w-[80%]">
              {data.data.firstName} {data.data.lastName}
            </p>
            <section className="flex flex-col items-center gap-2">
              <p className="w-full text-lg text-slate-700">
                {data.data.skills}
              </p>
              <button className="w-40 h-10 bg-blue-950 rounded-lg text-white font-bold">
                Download Resume
              </button>
            </section>
          </section>
        </section>
        <ViewCV />
      </section>
    );
  }
};
export default UserProfile;
