import { AxiosError } from "axios";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import Error from "../../shared/components/Error";
import Spinner from "../../shared/components/Loading";
import api from "../../api/axios";

const CompanyProfile = () => {
  const { companyId } = useParams();
  const { error, isLoading, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => api.get(`/company/${companyId}`),
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
    console.log(data.data);
    return (
      <section className="w-full flex flex-col items-center gap-2 pb-20">
        <section className="w-full flex justify-around lg:justify-center lg:gap-3 items-center pt-10">
          <Avatar className="border-[0.2px] w-40 h-40">
            <AvatarImage
              src={data.data.profileURL}
              alt={`${data.data.name}'s Photo`}
              className="grayscale object-cover"
            />
            <AvatarFallback className="font-bold">
              {data.data.name[0]} {data.data.name[1]}
            </AvatarFallback>
          </Avatar>
          <section className="w-[30%] flex flex-col items-center">
            <p className="font-bold text-lg w-full lg:w-[80%] text-start">
              {data.data.name}
            </p>
          </section>
        </section>
        <section className="w-[70%] flex flex-col items-center gap-2">
          <h2 className="w-full text-center font-bold text-lg">
            About {data.data.name}
          </h2>
          <p className="w-full text-wrap md:text-lg text-slate-700 text-start">
            {data.data.description}
          </p>
        </section>
      </section>
    );
  }
};
export default CompanyProfile;
