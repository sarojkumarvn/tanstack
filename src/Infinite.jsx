import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "./api/Api";

export const Infinite = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => {
      console.log("lastPage:", lastPage);
      if (Array.isArray(lastPage) && lastPage.length === 5) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 50;

    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]); // depend on values to refresh correctly

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

  return (
    <div >
      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page.map((user) => (
            <li
              key={user.id}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </li>
          ))}
        </ul>
      ))}
      {isFetchingNextPage && <p>Loading more...</p>}
      <div style={{ height: "100px" }} /> {/* space for scroll to trigger */}
    </div>
  );
};
