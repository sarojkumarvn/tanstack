import { fetchPosts } from "../api/Api";
import { useQuery } from "@tanstack/react-query";

export const FetchNew = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-black">Error loading posts</div>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-300 w-full md:w-3/4 lg:w-1/2 mx-auto h-[500px] overflow-y-auto mt-10">
      {(data || []).map(({ title, body }, index) => (
        <div
          key={index}
          className="border border-gray-400 p-4 rounded-lg shadow-md mt-10 bg-gray-500"
        >
          <ul className="list-disc pl-5">
            <li className="font-bold underline uppercase mb-2 text-lg text-black">
              {title}
            </li>
            <li className="text-white">{body}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};
