import { AxiosError } from "axios";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useTokenStorage } from "../../store/token";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import Error from "../../shared/components/Error";
import Spinner from "../../shared/components/Loading";
import api from "../../api/axios";

const UserProfile = () => {
  const { userId } = useParams();
  const accessToken = useTokenStorage((state) => state.userToken);
  const setAccessToken = useTokenStorage((state) => state.setUserToken);
  const { error, isLoading, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () =>
      api.get(`/user/${userId}`, {
        headers: { authorization: `authentication ${accessToken}` },
        withCredentials: true,
      }),
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
    setAccessToken(data.data.accessToken);
    const getDownloadUrl = (url: string) =>
      url.replace("/upload/", "/upload/fl_attachment/");
    return (
      <section className="w-full h-[60vh] flex flex-col gap-2">
        <section className="w-full flex justify-around lg:justify-center lg:gap-3 items-center pt-10">
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
            <p className="font-bold text-lg w-full lg:w-[80%] text-start">
              {data.data.firstName} {data.data.lastName}
            </p>
            <section className="flex flex-col items-center gap-2">
              <p className="w-full md:text-lg text-slate-700 text-start">
                {data.data.skills}
              </p>
              <section className="w-full flex flex-col lg:flex-row gap-2">
                <a
                  href={getDownloadUrl(data.data.CVurl)}
                  className="w-40 h-10 bg-blue-950 flex items-center justify-center rounded-lg cursor-pointer text-white font-bold"
                >
                  Download Resume
                </a>
                <a
                  href={data.data.CVurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-40 h-10  bg-gray-700 flex items-center justify-center rounded-lg cursor-pointer text-white font-bold"
                >
                  View Resume
                </a>
              </section>
            </section>
          </section>
        </section>
      </section>
    );
  }
};
export default UserProfile;
