import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../utils/api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
      <div>
        <label className="block">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border p-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
