import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//appwrite
import { account } from "../appwrite/config";
import { ID } from "appwrite";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserStart,
  registerUserSuccess,
  registerUserFail,
} from "../redux/slice/userSlice";

//icons
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import Oauth from "../components/Oauth";

export default function SignUp() {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(registerUserFail(false));
    if (currentUser) {
      navigate("/home");
    }
  }, []);

  const handlerPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userData.name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      return;
    }

    dispatch(registerUserStart());
    try {
      const response = await account.create(
        ID.unique(),
        userData.email,
        userData.password,
        userData.name
      );
      console.log(response);
      await account.createEmailPasswordSession(
        userData?.email,
        userData?.password
      );

      const accountDetails = await account.get();
      dispatch(registerUserSuccess(accountDetails));
      navigate("/home");
    } catch (error) {
      // console.log(error);
      if (error.code === 400) {
        dispatch(
          registerUserFail(
            "Password must be atleast 8 characters, and should be unique"
          )
        );
      } else if (error.code === 409) {
        dispatch(registerUserFail("Email already exist"));
      } else if (error.code === 429) {
        dispatch(registerUserFail("Too many request, Please try again later"));
      } else {
        dispatch(registerUserFail(error.message));
      }
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="bg-[#fff] flex justify-start items-center">
        <div className="bg-[#fff] lg:w-[30rem] xs:h-[32rem] lg:h-[37rem] p-12 ">
          <div>
            <h2 className="text-[#a3a3a3] text-[16px] pb-1 ">
              Welcome to todoList
            </h2>
            <h1 className="text-[#000] font-bold text-[24px] pb-3">
              Create your account
            </h1>
            <p className="text-[14px] mb-6">
              Already have account?{" "}
              <Link to="/" className="text-[#3c24f2] font-semibold">
                SignIn
              </Link>{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="text-[#000] font-[500] pb-1 text-[14px]">
              Your name
            </label>
            <input
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              type="text"
              placeholder="username"
              className="border p-2 rounded-sm focus-within:border-[#3c24f2] outline-none"
            />

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
                  onClick={handlerPassword}
                />
              ) : (
                <IoEyeOff
                  className="absolute top-1 right-1 text-[#98A2B1] w-[33px] h-[33px] cursor-pointer hover:bg-slate-200 rounded-[50%] p-2"
                  onClick={handlerPassword}
                />
              )}
            </div>
            <p className="mt-2 text-sm pl-3 text-red-500">{error && error}</p>
            <input
              disabled={loading}
              type="submit"
              value={loading ? "Registering..." : "Register now"}
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
