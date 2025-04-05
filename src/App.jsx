import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import { About } from "./Ui/About";
import { Contact } from "./Ui/Contact";
import { Setting } from "./Ui/Setting";
import { FetchOld } from "./Ui/FetchOld";
import { FetchNew } from "./Ui/FetchNew";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Brightness } from "./Brightness";
import { EachIndv } from "./EachIndv";
import { Infinite } from "./Infinite";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "fetchold",
        element: <FetchOld />,
      },
      {
        path: "fetchnew",
        element: <FetchNew />,
      },
      {
        path: "fetchnew/:id",
        element: <EachIndv />,
      },
      {
        path: "infinite",
        element: <Infinite />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "brightness",
        element: <Brightness />,
      },
    ],
  },
]);

const App = () => {
  const theQueryClient = new QueryClient(); // creating the query client

  return (
    // wrapping the app with the query client provider which provide the query client to the app
    <QueryClientProvider client={theQueryClient}>
      <RouterProvider router={Router}></RouterProvider>
      {/* accessing the react query dev tools  */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
