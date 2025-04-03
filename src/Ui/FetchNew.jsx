import { NavLink } from "react-router-dom";
import { fetchPosts } from "../api/Api";
import { useQuery } from "@tanstack/react-query";

export const FetchNew = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"], // get the posts from the api
    queryFn: fetchPosts, // query function
    staleTime: 7000, // how long the data should be kept in the cache before refetching
    refetchInterval: 1000, // how often the data should be refetched
    refetchIntervalInBackground: true, // refetching in the background
  });

  if (isLoading)
    return <div className="text-center text-lg text-white">Loading...</div>; // if the data is loading then show this
  if (error)
    return (
      <div className="text-center text-black">
        Error: {error.message || "Something went wrong, please try again"}
      </div>
    ); // if there is an error then show this

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-300 w-full md:w-3/4 lg:w-1/2 mx-auto h-[500px] overflow-y-auto mt-10">
      {data.map(({ title, body }, index) => {
        const adjustedIndex = index + 1; // Start index from 1
        return (
          <div
            key={adjustedIndex}
            className="border border-gray-400 p-4 rounded-lg shadow-md mt-10 bg-gray-500"
          >
            <ul className="list-disc pl-5">
              <NavLink to={`/fetchnew/${adjustedIndex}`}>
                <li>posts : {adjustedIndex}</li>
                <li className="font-bold underline uppercase mb-2 text-lg text-black">
                  {title}
                </li>
                <li className="text-white">{body}</li>
              </NavLink>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
