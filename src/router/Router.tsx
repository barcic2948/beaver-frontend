import { createBrowserRouter, redirect } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import store from "../redux/Store";
import HomePage from "../pages/HomePage";

const loginLoader = async () => {
  const isLoggedIn = store.getState().user.isLoggedIn;
  if (isLoggedIn) {
    return redirect("/");
  }
  return null;
};

const homeLoader = async () => {
  const isLoggedIn = store.getState().user.isLoggedIn;
  if (!isLoggedIn) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: loginLoader,
  },
  {
    path: "/home",
    element: <HomePage />,
    loader: homeLoader,
  },
]);

export default router;
