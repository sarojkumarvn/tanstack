import { NavLink } from "react-router-dom";
import { deletePost, fetchPosts, updatePost } from "../api/Api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const FetchNew = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", pageNumber], // get the posts from the api
    queryFn: () => fetchPosts(pageNumber), // query function
    staleTime: 7000, // how long the data should be kept in the cache before refetching
    // refetchInterval: 1000, // how often the data should be refetched
    // refetchIntervalInBackground: true, // refetching in the background
    placeholderData: keepPreviousData, // TO KEEP THE PREVIOUS DATAfor the previous page
  });

  //Mutation function to delete the data

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      // on success run this
      // console.log(data, id);
      queryClient.setQueryData(["posts", pageNumber], (currElem) => {
        return currElem?.filter((post) => post.id !== id);
      });
    },
  });

  //  TO UPDATE THE POST
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (ApiData, PostId) => {
      queryClient.setQueryData(["posts", pageNumber], (postData) => {
        return postData?.map((post) => {
          return post.id === PostId
            ? { ...post, title: ApiData.data.title }
            : post;
        });
      });
    },
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
      <div className=" shadow-lg rounded-xl p-6  w-full md:w-3/4 lg:w-1/2 mx-auto h-[500px] overflow-y-hidden mt-10">
        {data.map(({ id, title, body }, index) => {
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
                <button
                  onClick={() => deleteMutation.mutate(id)}
                  className="btn btn-primary "
                >
                  Delete
                </button>
                <button
                  onClick={() => updateMutation.mutate(id)}
                  className="btn btn-wide ml-10 mt-2"
                >
                  Update
                </button>
              </ul>
            </div>
          );
        })}
      </div>
      <div className="flex justify-start gap-10 items-center ">
        <button
          disabled={pageNumber <= 0}
          onClick={() => setPageNumber((prev) => prev - 1)}
          className="btn btn-primary"
        >
          Prev
        </button>
        <p>{pageNumber}</p>
        <button
          disabled={pageNumber === 50 ? true : false}
          onClick={() => setPageNumber((prev) => prev + 2)}
          className="btn btn-primary mt-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};
