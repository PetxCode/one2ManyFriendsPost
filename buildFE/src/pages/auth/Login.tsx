import { useState } from "react";
import { LoginUser } from "../../api/userAPI";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../global/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();

    LoginUser({ email, password }).then((res) => {
      if (res.status === 201) {
        dispatch(loginUser(res.data));
        navigate("/");
      }
    });
  };

  return (
    <div className="ml-4">
      <h1>Login Page</h1>
      <p>Welcome to the registration page.</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label>email:</label>{" "}
        <input
          type="text"
          name="username"
          className="border w-[300px] h-[45px] rounded-md "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>{" "}
        <input
          // type="password"
          // name="password"
          className="border w-[300px] h-[45px] rounded-md "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="w-[300px] mb-4">
          Login Now
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/auth">Register</Link>
      </p>
    </div>
  );
};

export default Login;
