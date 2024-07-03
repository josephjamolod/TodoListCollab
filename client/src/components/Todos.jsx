import db from "../appwrite/databases";
import { Link } from "react-router-dom";
import { toggleCheck } from "../redux/slice/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//icons
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAutoDelete } from "react-icons/md";
import { FaRegFaceFrownOpen } from "react-icons/fa6";

export default function Todos({ todos, setTodos }) {
  const { latest } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);

  const handleLatest = (e) => {
    dispatch(toggleCheck(true));
  };

  const handleOldest = (e) => {
    dispatch(toggleCheck(false));
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await db.tasks.delete(id);
      const newTodos = todos.filter((todo) => todo.$id !== id);
      setTodos(newTodos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="  w-full ">
      <div className="max-w-[900px]  mx-auto bg-[#3c24f2] border border-slate-400 lg:border-x lg:border-x-gray-600 my-10">
        <div className="text-white text-sm p-3 flex items-center gap-x-2">
          <span className="text-base">Sort by:</span>
          <label>Latest</label>
          <input checked={latest} onChange={handleLatest} type="checkbox" />
          <label>Oldest</label>
          <input checked={!latest} onChange={handleOldest} type="checkbox" />
        </div>

        <div className="hidden md:flex p-3 md:py-0 overflow-x-auto border-b border-b-slate-400 md:items-center bg-white flex-col gap-y-3  md:flex-row">
          {/* <th className="flex-1" /> */}
          <h1 className="invisible text-slate-400 font-bold flex-shrink pr-8 border-b border-b-slate-400 md:border-none">
            I
          </h1>
          <h1 className="  md:min-w-[185px] truncate text-md font-medium tracking-tighter text-gray-600 capitalize">
            Title
          </h1>
          <h1 className=" md:min-w-[350px] overflow-hidden truncate border border-slate-400 bg-slate-200 md:bg-white md:border-none rounded-lg md:rounded-none  p-2  ">
            Task
          </h1>

          <h1 className="text-start self-start md:self-center flex-1 mt-3 md:mt-0">
            completed
          </h1>

          <h1 className="px-2 self-start md:self-center flex-1 mt-3 md:mt-0">
            Modify
          </h1>
        </div>
        {todos.length === 0 && (
          <div className="flex text-slate-400 items-center justify-center gap-x-3 h-32 md:py-0 overflow-x-auto border-b border-b-slate-400 bg-slate-200 ">
            <span className="text-xl ">No Task Here</span>
            <FaRegFaceFrownOpen className="text-2xl" />
          </div>
        )}
        {todos.map((todo, index) => {
          return (
            <div
              key={index}
              className="p-3 md:py-0 overflow-x-auto border-b border-b-slate-400 md:items-center bg-white flex flex-col gap-y-3  md:flex-row"
            >
              {/* <th className="flex-1" /> */}
              <h1 className="text-slate-400 font-bold flex-shrink min-w-8 border-b border-b-slate-400 md:border-none">
                {index + 1}
              </h1>
              <h1 className="  md:min-w-[185px] truncate text-md font-medium tracking-tighter text-gray-600 capitalize">
                {todo.title?.length < 18
                  ? todo.title
                  : todo.title?.slice(0, 18) + " . . ."}
              </h1>
              <h1 className=" md:min-w-[350px] overflow-hidden truncate border border-slate-400 bg-slate-200 md:bg-white md:border-none rounded-lg md:rounded-none  p-2  ">
                {todo.task?.length < 30
                  ? todo.task
                  : todo.task?.slice(0, 30) + " . . ."}
              </h1>
              <input
                type="checkbox"
                readOnly
                checked={todo.completed}
                className=" self-start md:self-center flex-1 mt-3 md:mt-0"
              />
              <div className="flex justify-end gap-x-3">
                <Link
                  to={`/editTodo/${todo.$id}`}
                  className="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 
          flex justify-center px-2 duration-300 hover:border-slate-600 
           active:stroke-blue-200 active:bg-blue-400"
                >
                  View | Edit
                </Link>
                <button disabled={isloading} className="relative">
                  {isloading ? (
                    <MdOutlineAutoDelete
                      className="text-3xl p-1 border
                  hover:border-red-300 hover:text-red-400 
                  cursor-pointer rounded-md bg-slate-100 transition-colors duration-300"
                    />
                  ) : (
                    <AiOutlineDelete
                      onClick={() => handleDelete(todo.$id)}
                      className="text-3xl p-1 border
                  hover:border-red-300 hover:text-red-400 
                  cursor-pointer rounded-md bg-slate-100 transition-colors duration-300"
                    />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
