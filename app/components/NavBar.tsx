'use client'
import Link from "next/link";
import React, { useState } from "react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [settings, openSettings] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("User logged in!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log("User logged out!");
  };

  const handleSettings = () => {
    openSettings(true)
    console.log("Opened Settings")
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">SEO Assistant</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile"
                src="/dtg.png"
                className="w-10 rounded-full"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          > {isLoggedIn ? (
            <>
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <Link href='./settings'>Settings</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </>
          ) : (
            <li>
              <a onClick={handleLogin}>Login</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>
);
};

export default NavBar;