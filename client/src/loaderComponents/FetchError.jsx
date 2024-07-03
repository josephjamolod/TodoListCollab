import { FaRegFaceFrownOpen } from "react-icons/fa6";

export default function FetchError() {
  return (
    <div className="flex items-center justify-center gap-x-3 border-4 border-red-200 text-red-300 rounded-md py-4 my-10 w-1/2  ">
      There was an Error, Please try again later.
      <FaRegFaceFrownOpen />
    </div>
  );
}
