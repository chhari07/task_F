import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../api/api";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/auth/signup", form);

      alert("Signup Successful");

      navigate("/");
    } catch (error) {
      alert("Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="w-[420px] bg-white p-8 rounded-3xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="border p-4 rounded-xl"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="border p-4 rounded-xl"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="border p-4 rounded-xl"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="role"
            className="border p-4 rounded-xl"
            value={form.role}
            onChange={handleChange}
          >
            <option value="Member">
              Member
            </option>

            <option value="Admin">
              Admin
            </option>
          </select>

          <button className="bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700">
            {loading ? "Loading..." : "Signup"}
          </button>

          <p className="text-center text-slate-500">
            Already have account?

            <Link
              to="/"
              className="text-blue-600 ml-2"
            >
              Login
            </Link>
          </p>

        </div>
      </form>
    </div>
  );
};

export default Signup;