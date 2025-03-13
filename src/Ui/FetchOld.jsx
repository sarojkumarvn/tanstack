import React, { useEffect, useState } from "react";
import { fetchOldMethod} from "../api/Api";

export const FetchOld = () => {
  const [Posts, setPosts] = useState([]);

  const getPostsData = async () => {
    try {
      const res = await fetchOldMethod();
      console.log(res);
      if (res.status === 200) {
        setPosts(res.data);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-300 w-full md:w-3/4 lg:w-1/2 mx-auto h-[500px] overflow-y-auto mt-10">
      {Posts.map(
        (
          { title, body },
          index // Destructuring directly inside the map function
        ) => (
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
        )
      )}
    </div>
  );
};
