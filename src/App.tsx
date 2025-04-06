import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import CommonLayout from "./layout/CommonLayout";
import { queryClient } from "./services/TanstackQueryStore";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";
import Dashboard from "./pages/Dashboard";
import Debate from "./pages/Debate";
import LoadingAuth from "./pages/LoadingAuth";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import SignUp from "./pages/SignUp";

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
      { path: "/loadingAuth", element: <LoadingAuth /> },
      {
        path: "/post/:id",
        element: <PostDetail />,
      },
      { path: "/chatting/:id", element: <ChatRoom /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
