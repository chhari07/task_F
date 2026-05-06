import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../api/api";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/login",
        form
      );

      login(data);

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white p-8 rounded-3xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Enter Email"
            className="border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button className="bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700">
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-center text-slate-500">
            Don't have account?

            <Link
              to="/signup"
              className="text-blue-600 ml-2"
            >
              Signup
            </Link>
          </p>

        </div>
      </form>
    </div>
  );
};

export default Login;