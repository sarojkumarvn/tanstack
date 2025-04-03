import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//New method
export const fetchPosts = async () => {
  const res = await api.get("/posts"); // getting the posts
  return res.status === 200 ? res.data : []; //returning the posts
};

//Old method
export const fetchOldMethod = () => {
  return api.get("/posts");
};

// to get the individual data from the api
export const fetchindvpost = async (id) => {
  try {
    if (id > 0) {
      const res = await api.get(`/posts/${id}`); // Await the response
      return res.status === 200 ? res.data : []; // Return data if status is 200
    } else {
      console.log("Not found Please try again later");
    }
  } catch (error) {
    console.error("Error fetching individual post:", error);
  }
};
