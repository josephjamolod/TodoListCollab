import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFail,
} from "../redux/slice/userSlice";
import { account } from "../appwrite/config";

export default function SignOutBtn() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const handleLogOut = async () => {
    dispatch(signOutUserStart());
    try {
      await account.deleteSession("current");
      dispatch(signOutUserSuccess());
    } catch (error) {
      console.log(error);
      dispatch(signOutUserFail());
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleLogOut}
      className="text-sm  border border-transparent bg-slate-100 hover:border-slate-400 px-3 py-1"
    >
      {loading ? "Logging Out..." : "Log Out"}
    </button>
  );
}
