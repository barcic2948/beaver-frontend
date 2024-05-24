import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { logout } from "../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api/ApiClient";

export default function WelcomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    if (token !== null) {
      await fetch("http://localhost:8080/logout", {
        method: "GET",
        headers: {
          Authorization: token,
        },
        credentials: "include",
      });
      dispatch(logout());
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleHomeRedirect = () => {
    navigate("/home");
  };

  return <></>;
}

/*
<div id="WelcomePage">
      <h1>Welcome page</h1>
      <p>This is a Welcome page, how are you doing?</p>
      <button onClick={handleLogout}> Logout </button>
      <button onClick={handleLoginRedirect}> Login </button>
      <button onClick={handleHomeRedirect}> Home </button>
    </div>
*/
