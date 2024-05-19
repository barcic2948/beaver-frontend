import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { login } from "../redux/UserSlice";
import { jwtDecode } from "jwt-decode";
import "./LoginPage.css";

interface JwtToken {
  sub: string;
  scope: string;
  iss: string;
  exp: number;
  iat: number;
  firstName: string;
  lastName: string;
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (username && password) {
      const credentials: string = btoa(`${username}:${password}`);
      try {
        const response = await fetch("http://localhost:8080/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("access_token", data.access_token);

          const decodedToken: JwtToken = jwtDecode(data.access_token);
          const { sub, firstName, lastName, scope } = decodedToken;
          dispatch(
            login({
              username: sub,
              firstName: firstName,
              lastName: lastName,
              scope: scope,
            })
          );
        } else {
          alert("Lopgin failed: " + response.statusText);
        }
      } catch (error: any) {
        console.error("Error during login", error);
        alert("Login failed: " + error.message);
      }
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div id="login-page" className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
