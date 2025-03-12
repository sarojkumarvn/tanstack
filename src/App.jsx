import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/layouts/MainLayout";
import { About } from "./Ui/About";
import { Contact } from "./Ui/Contact";
import { Setting } from "./Ui/Setting";
import { FetchOld } from "./Ui/FetchOld";
import { FetchNew } from "./Ui/FetchNew";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);

const App = () => {
const theQueryClient = new QueryClient();

  return (
    <QueryClientProvider client={theQueryClient}>


    <RouterProvider router={Router}>
    </RouterProvider>
    </QueryClientProvider>
  );
};

export default App;
