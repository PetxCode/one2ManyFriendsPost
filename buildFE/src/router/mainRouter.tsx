import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import HomePage from "../pages/home/HomePage";
import PrivateRoute from "./PrivateRoute";
import Post from "../pages/home/Post";
import FriendDetails from "../pages/home/FriendDetails";

export const mainRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        index: true,
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        {" "}
        <HomePage />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Post />,
      },
      {
        index: true,
        path: ":id",
        element: <FriendDetails />,
      },
    ],
  },
]);
