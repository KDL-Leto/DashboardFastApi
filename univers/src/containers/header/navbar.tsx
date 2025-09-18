import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// Narbar components

interface Narbarprops {
  items: NavbarItems[];
  className?: string;
}

export interface NavbarItems {
  title: string;
  path: string;
}

const Navbar: React.FC<Narbarprops> = ({ items, className }) => {
  const [isOpenMenu, setOpenMenu] = useState(false);

  return (
    <nav
      className={` ${className} flex justify-between items-center shadow-lg px-6 py-4 `}
    >
      <h1 className="text-4xl">
        <span className="text-yellow-600">E</span>Shop
      </h1>
      <div className="flex gap-35 items-center max-md:hidden">
        <ul className="flex justify-center items-center gap-5 ">
          {items.map((item) => (
            <li key={item.title} className="text-xl text-yellow-700">
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-9">
          <Link to="/Login">
            <Button
              title="Login"
              className="text-yellow-600
             border border-solid px-9 py-2 rounded-md"
            />
          </Link>
          <Link to="/Signin">
            <Button
              title="Sign in"
              className="text-white border-none bg-yellow-600 px-9 py-2 rounded-md"
            />
          </Link>
        </div>
      </div>

      <div
        className="md:hidden"
        onClick={() => {
          setOpenMenu(!isOpenMenu);
        }}
      >
        <button className="cursor-pointer">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div
        className={`absolute lg:hidden top-18 left-0
        w-full bg-white flex flex-col items-center gap-6 p-6 font-semibold text-lg 
        transform transition-transform ${
          isOpenMenu ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "transform 0.6s ease, opacity 0.6s ease" }}
      >
        {items.map((item) => (
          <li
            key={item.path}
            className="list-none w-full text-center py-1
          hover:bg-yellow-600 hover:text-white transition-all cursor-pointer"
          >
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
        <div className="flex gap-9">
          <Link to="/Login">
            <Button
              title="Login"
              className="text-yellow-600
             border border-solid px-6 py-1 rounded-md"
            />
          </Link>
          <Link to="/Signin">
            <Button
              title="Sign in"
              className="text-white border-none bg-yellow-600 px-6 py-1 rounded-md"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
