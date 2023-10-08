import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Nav = () => {
  return (
    <nav className="w-full flex justify-between items-center mb-10 pt-3 mt-2">
      <Link to="/">
        <h1 alt="summize_logo" className="text-2xl font-bold text-black">
          Summize
        </h1>
      </Link>

      <a
        href="https://github.com/Devai-coding"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-black text-white rounded-md transition duration-300 hover:bg-gray-800"
      >
        GitHub
      </a>
    </nav>
  );
};

export default Nav;
