import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "../appwrite/config";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  signInUserStart,
  signInUserSuccess,
  signInUserFail,
} from "../redux/slice/userSlice";

//icons
import { IoEye, IoEyeOff } from "react-icons/io5";
import Oauth from "../components/Oauth";

export default function SignIn() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signInUserFail(false));
    if (currentUser) {
      navigate("/home");
    }
  }, []);

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "") {
      return;
    }
    dispatch(signInUserStart());
    // console.log(userData);
    try {
      const response = await account.createEmailPasswordSession(
        userData?.email,
        userData?.password
      );
      const accountDetails = await account.get();
      // console.log(currentUser, loading, error);
      // console.log(response);
      // console.log(accountDetails);
      dispatch(signInUserSuccess(accountDetails));
      navigate("/home");
    } catch (error) {
      // console.log(error);
      if (error.code === 400) {
        dispatch(
          signInUserFail(
            "Invalid credentials. Please check the email and password."
          )
        );
      } else if (error.code === 401) {
        dispatch(
          signInUserFail(
            "Invalid credentials. Please check the email and password."
          )
        );
      } else if (error.code === 429) {
        dispatch(signInUserFail("Too many request, Please try again later"));
      } else {
        dispatch(signInUserFail(error.message));
      }
    }
  };

  return (
    <div className="flex w-full h-screen py-10 md:py-20 justify-center">
      <div className="bg-[#fff] flex justify-start items-center max-h-[600px]">
        <div className="bg-[#fff] lg:w-[30rem] xs:h-[32rem] lg:h-[33rem] p-12 ">
          <div>
            <h2 className="text-[#a3a3a3] text-[16px] pb-1 ">
              Welcome to todoList
            </h2>
            <h1 className="text-[#000] font-bold text-[24px] pb-3">
              Login your account
            </h1>
            <p className="text-[14px] mb-6">
              Already have account?{" "}
              <Link to="/sign-up" className="text-[#3c24f2] font-semibold">
                SignUp
              </Link>{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="text-[#000] font-[500] pb-1 text-[14px] pt-3">
              Your email
            </label>
            <input
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              type="email"
              placeholder="user@gmail.com"
              className="border p-2 rounded-sm focus-within:border-[#3c24f2] outline-none"
            />

            <label className="text-[#000] font-[500] pb-1 text-[14px] pt-3">
              Password
            </label>
            <div className="relative w-full ">
              <input
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                className="border p-2 rounded-sm focus-within:border-[#3c24f2] outline-none w-full"
              />
              {showPassword ? (
                <IoEye
                  className="absolute top-1 right-1 text-[#98A2B1] w-[33px] h-[33px] cursor-pointer hover:bg-slate-200 rounded-[50%] p-2"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoEyeOff
                  className="absolute top-1 right-1 text-[#98A2B1] w-[33px] h-[33px] cursor-pointer hover:bg-slate-200 rounded-[50%] p-2"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <p className="mt-2 text-sm pl-3 text-red-500">{error && error}</p>
            <input
              disabled={loading}
              type="submit"
              value={loading ? "Logging in..." : "Login now"}
              className="bg-[#3c24f2] disabled:opacity-80 p-3 mt-3 rounded-sm cursor-pointer text-[#fff] hover:opacity-95 active:bg-blue-800"
            />

            <div className="flex justify-center items-center gap-3">
              <hr className="mt-2 h-1 text-[#000] w-[100%]" />
              <p className="text-center pt-2">or</p>
              <hr className="mt-2 h-1 text-[#000] w-[100%]" />
            </div>
            <Oauth />
          </form>
        </div>
      </div>
    </div>
  );
}
