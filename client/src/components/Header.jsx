import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.svg";
import SignOutBtn from "./SignOutBtn";

export default function Header() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser);
  return (
    <div className="bg-white h-16 md:h-20 shadow-md flex justify-between items-center px-8 md:px-10">
      <Link to={"/"}>
        <img src={logo} className="h-12 md:h-16" alt="logo" />
      </Link>
      {!currentUser ? (
        <div className="flex gap-x-3">
          <Link
            to={"/"}
            className={`${
              pathname === "/" && "underline"
            } text-sm bg-[#3c24f2] disabled:opacity-80 px-3 py-2 rounded-sm cursor-pointer text-[#fff] hover:opacity-90 active:bg-blue-800`}
          >
            Log In
          </Link>

          <Link
            to={"/sign-up"}
            className={`${
              pathname === "/sign-up" && "underline"
            } text-sm bg-[#3c24f2] disabled:opacity-80 px-3 py-2 rounded-sm cursor-pointer text-[#fff] hover:opacity-90 active:bg-blue-800`}
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="flex gap-x-5 items-center">
          <h1 className="text-[#3c24f2]">
            Hi <span>{currentUser.name}</span>!
          </h1>
          <SignOutBtn />
        </div>
      )}
    </div>
  );
}
