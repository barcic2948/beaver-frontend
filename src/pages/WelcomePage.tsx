import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { logout } from "../redux/UserSlice";

export default function WelcomePage() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <div id="WelcomePage">
      <h1>Welcome page</h1>
      <p>This is a Welcome page, how are you doing?</p>
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
}
