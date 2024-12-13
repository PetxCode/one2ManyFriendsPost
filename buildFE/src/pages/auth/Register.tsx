import { useState } from "react";
import { createUser } from "../../api/userAPI";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const handleImage = (e: any) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", avatar);

    createUser(formData);
  };

  return (
    <div className="ml-4">
      <h1>Register Page</h1>
      <p>Welcome to the registration page.</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <br />
        <br />
        <br />
        <label
          htmlFor="avatar"
          className="p-3 bg-black text-white w-[200px] flex justify-center "
        >
          avatar
          <input
            type="file"
            name="username"
            className="hidden"
            id="avatar"
            onChange={handleImage}
          />
        </label>
        <br />
        <br />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          className="border w-[300px] h-[45px] rounded-md "
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
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
          type="password"
          name="password"
          className="border w-[300px] h-[45px] rounded-md "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="w-[300px] mb-4">
          Submit
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
