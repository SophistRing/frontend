import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import CommonLayout from "./layout/CommonLayout";
import { queryClient } from "./services/TanstackQueryStore";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Debate from "./pages/Debate";
import LoadingAuth from "./pages/LoadingAuth";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import Chatting from "./pages/Chatting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/debate",
        element: <Debate />,
      },
      {
        path: "/post/:id",
        element: <PostDetail />,
      },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  { path: "/loadingAuth", element: <LoadingAuth /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/room/:id", element: <Chatting /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
