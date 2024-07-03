import { FcGoogle } from "react-icons/fc";
import { account } from "../appwrite/config";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInUserSuccess } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const accountDetails = await account.get();
      dispatch(signInUserSuccess(accountDetails));
      navigate("/home");
    } catch (error) {
      return;
    }
  };

  const handleOauth = async () => {
    try {
      await account.createOAuth2Session(
        "google",
        import.meta.env.VITE_LINK_FOR_SUCCESS_LOGIN,
        import.meta.env.VITE_LINK_FOR_FAIL_LOGIN
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleOauth}
      className="flex justify-center items-center gap-3 p-3 border mt-4 w-full bg-white cursor-pointer shadow-md hover:bg-gray-100 duration-500 transform ease-in-out rounded-[.7rem] "
    >
      <FcGoogle />
      <p>Sign up with Google</p>
    </button>
  );
}
