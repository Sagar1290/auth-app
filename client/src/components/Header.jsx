import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const [showUserMenu, setShowUserMenu] = useState(false);
  const handleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  // console.log(currentUser.photURL);
  return (
    <section className="bg-red-100 flex flex-nowrap justify-between items-center p-3">
      <Link to="/">
        <div className="font-bold text-2xl">CompanyName</div>
      </Link>
      <div className=" sm:hidden">
        <button
          className="text-black bg-gray-300 font-bold rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center"
          type="button"
          onClick={handleClick}
        >
          explore{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {showMenu && (
          <div className="relative">
            <div className="absolute top-4 -left-14 ">
              <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                <ul className="py-2 text-md text-gray-700 dark:text-gray-200">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                      about
                    </a>
                  </li>
                  <li>
                    <Link to="sign-in">
                      <p className="block px-4 py-2 hover:bg-gray-100 ">
                        Join Us
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden sm:flex justify-center items-center">
        <div className="mx-3">
          <ul className="sm:flex sm:gap-8 font-semibold sm:text-xl">
            <Link to="/">
              <li className="hover:text-blue-700">Home</li>
            </Link>
            <Link to="/about">
              <li className="hover:text-blue-700">About</li>
            </Link>

            <Link to="/profile">
              {currentUser ? (
                <img
                  src={currentUser.rest.photoURL}
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <button className="font-semibold sm:text-xl ">Join Us</button>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Header;
