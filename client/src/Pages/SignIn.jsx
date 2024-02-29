import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInEnd,
  signInFailed,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({});

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:8000/api/user/login", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (data.success == false) {
        dispatch(signInFailed(data));
        return;
      }
      dispatch(signInEnd(data));
      alert("user login successfully");
      navigator("/");
    } catch (error) {
      dispatch(signInFailed(error));
    }
  };

  return (
    <section className="max-w-lg mx-auto flex flex-col">
      <h1 className="text-3xl font-bold text-center my-3">Sign In</h1>
      <form className="flex flex-col gap-4 py-4 m-2" onSubmit={handleSubmit}>
        <input
          placeholder="Enter username"
          id="username"
          className="p-4 bg-slate-200 rounded-md"
          onChange={handleChange}
        />
        <input
          placeholder="Enter your password"
          type="password"
          id="password"
          className="p-4 bg-slate-200 rounded-md"
          onChange={handleChange}
        />
        <button
          className="p-4 bg-slate-600 rounded-md text-white font-semibold text-xl disabled:opacity-75"
          type="submit"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2">
        <p>Dont have an account!</p>
        <Link to="/sign-up">
          <span className="text-blue-700 underline">Sign-up</span>
        </Link>
      </div>

      <div className="my-3 text-lg">
        {error ? error.message || "something went wrong!!" : ""}
      </div>
    </section>
  );
};

export default SignIn;
