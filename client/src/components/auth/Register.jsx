import { useState } from "react";
import useToken from "../../hooks/useToken";
import { BASE_API_URL } from "../../api/BaseURL";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { setToken, saveProfilePic, saveEmail } = useToken();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirm_password) {
      setError("Please provide all values!");
      return;
    }
    if (password !== confirm_password) {
      setError("Passwords did not match!");
      return;
    }
    setLoading(true);
    const res = await fetch(`${BASE_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (data.accessToken) {
      setToken(data.accessToken);
      saveProfilePic(data.profilePic);
      saveEmail(data.email);
      window.location.replace("/");
    } else {
      setError(data.message);
      setLoading(false);
    }
    console.log(data, "data");
  };

  return (
    <div className="w-full p-3">
      <h1 className="text-2xl text-black font-semibold mb-4">
        Register yourself
      </h1>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="text-black mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-400 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="text-black mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-400 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="text-black mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ul className="text-sm list-disc ml-5 text-gray-500">
            <li>The password must be 8 characters long</li>
            <li>It must contain a small and a capital case letter/alphabet</li>
            <li>Password must contain a numeric digit</li>
            <li>Password must contain a special character (@,#...)</li>
          </ul>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-400 font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="text-black mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-m text-red-500 text-center mb-3">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring"
          disabled={loading}
          onClick={handleRegister}
        >
          {!loading ? "Register" : "Wait..."}
        </button>
      </form>
    </div>
  );
};

export default Register;
