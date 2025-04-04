import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { fetchindvpost } from "./api/Api";

export const EachIndv = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", id], // get the posts from the api 
    queryFn: () => fetchindvpost(id), // query function from which we get the data
  });


 


  if (isLoading) return <span className="loading loading-bars loading-xs"></span>,
  <span className="loading loading-bars loading-sm"></span>,
  <span className="loading loading-bars loading-md"></span>,
  <span className="loading loading-bars loading-lg"></span>,
  <span className="loading loading-bars loading-xl"></span>;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <div className="flex justify-center flex-col gap-5 items-center w-full h-full">
      <h1 className="font-bold text-2xl text-white underline">
        Post detail number {id}
      </h1>
      <ul className="list-disc pl-5 bg-emerald-500 text-black p-5">
        <li className="font-bold underline uppercase mb-2 text-lg text-black">
          {data.title}
        </li>
        <li className="text-white">{data.body}</li>
      </ul>
      <Link
      to={"/fetchnew"}
      
      >
      <button className="btn btn-primary"> Go back</button>
      </Link>
    </div>
  );
};
