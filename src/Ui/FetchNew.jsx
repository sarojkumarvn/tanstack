import { NavLink } from "react-router-dom";
import { fetchPosts } from "../api/Api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const FetchNew = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts" , pageNumber], // get the posts from the api
    queryFn: () => fetchPosts(pageNumber), // query function
    staleTime: 7000, // how long the data should be kept in the cache before refetching
    refetchInterval: 1000, // how often the data should be refetched
    refetchIntervalInBackground: true, // refetching in the background
    placeholderData: keepPreviousData, // TO KEEP THE PREVIOUS DATAfor the previous page 
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
    <div>

    <div className=" shadow-lg rounded-xl p-6  w-full md:w-3/4 lg:w-1/2 mx-auto h-[500px] overflow-y-auto mt-10">
      {data.map(({ id , title, body }, index ) => {
        return (
          <div
          key={id || index}
          className="border border-gray-400 p-4 rounded-lg shadow-md mt-10 bg-gray-500"
          >
            <ul className="list-disc pl-5">
              <NavLink to={`/fetchnew/${id}`}>
                <li>posts : {id}</li>
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
    <div className="flex justify-start gap-10 items-center ">
        <button
        disabled = {pageNumber === 0 ? true : false}
        onClick={() => setPageNumber((prev )=> prev - 2)}
        className="btn btn-primary">Prev</button>
        <p>{pageNumber}</p>
        <button
        disabled = {pageNumber === 50 ? true : false}
        onClick={() => setPageNumber((prev )=> prev + 2)}
        className="btn btn-primary">Next</button>
      </div>
      </div>
  );
};
