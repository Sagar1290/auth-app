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
        <div className="font-bold text-2xl p-2">Authify</div>
      </Link>

      <div className="sm:flex justify-center items-center">
        <div className="mx-3">
          <ul className="flex gap-8 font-semibold text-xl">
            <Link to="/">
              <li className="hidden sm:block hover:text-blue-700">Home</li>
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
