import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/user/register", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data);
        return;
      }
      alert("user successfully signed up");
      navigator("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <section className="flex flex-col p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-4">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          id="username"
          placeholder="Enter your username"
          type="text"
          className="p-4 bg-slate-200 rounded-md"
          onChange={handleChange}
        />
        <input
          id="email"
          placeholder="Email"
          type="mail"
          className="p-4 bg-slate-200 rounded-md"
          onChange={handleChange}
        />
        <input
          id="fullname"
          placeholder="Full Name"
          type="text"
          className="p-4 bg-slate-200 rounded-md"
          onChange={handleChange}
        />
        <input
          id="password"
          placeholder="Password"
          type="password"
          className="p-4 bg-slate-200 rounded-md"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="p-4 bg-slate-600 rounded-md hover: text-white font-semibold text-xl disabled:opacity-75"
        >
          {loading ? "loading..." : "Sign-up"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-3">
        <p>Already have an account !</p>
        <Link to="/sign-in">
          <span className="text-blue-800">sign In</span>
        </Link>
      </div>
      <div className="mt-4 text-lg">
        <p>{error ? error.message || "Something went wrong" : ""}</p>
      </div>
    </section>
  );
};

export default SignUp;
