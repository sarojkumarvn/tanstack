import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async () => {
    const res = await api.get("/posts");
    return res.status === 200 ? res.data : []; 
};


export const fetchOldMethod = () => {
  return api.get("/posts");
}
