import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import db from "../appwrite/databases";

import { IoMdArrowRoundBack } from "react-icons/io";
import FetchTodoLoader from "../loaderComponents/FetchTodoLoader";

export default function EditTodo() {
  const { id } = useParams();
  const [todo, setTodo] = useState({ title: "", task: "", completed: "" });
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //fetchTodo loader
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    setFetchLoading(true);
    try {
      const response = await db.tasks.get(id);
      setTodo(response);
      setFetchLoading(false);
    } catch (error) {
      console.log(error);
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    if (todo.task === "" || todo.title === "") {
      return;
    }
    try {
      await db.tasks.update(id, {
        title: todo.title,
        task: todo.task,
        completed: todo.completed,
      });
      setIsLoading(false);
    } catch (error) {
      if (
        error.type === "document_invalid_structure" &&
        error.message.includes("title")
      ) {
        setIsError("Title must no longer than 150 characters");
      } else if (
        error.type === "document_invalid_structure" &&
        error.message.includes("task")
      ) {
        setIsError("Title must no longer than 400 characters");
      } else {
        setIsError(error.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center mt-20">
      {fetchLoading ? (
        <FetchTodoLoader />
      ) : (
        <div>
          <Link
            to={"/home"}
            className="flex items-center  my-2 border border-slate-400 w-fit px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-sm"
          >
            <IoMdArrowRoundBack className="text-2xl " />
            <span className="font-semibold text-sm">Back</span>
          </Link>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 w-full max-w-[400px] gap-2 rounded-xl p-2 text-sm"
          >
            <h1 className="text-center text-slate-400 text-xl font-bold col-span-6">
              Update Todo
            </h1>
            <input
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              value={todo?.title}
              placeholder="Title here..."
              className="w-full mt-3 bg-slate-200 text-slate-600  placeholder:text-slate-600 placeholder:opacity-50 border border-slate-400 col-span-6 resize-none outline-none rounded-t-lg p-2 duration-300 focus:border-slate-600"
            />
            <textarea
              onChange={(e) => setTodo({ ...todo, task: e.target.value })}
              value={todo?.task}
              placeholder="Type here..."
              className="w-full  bg-slate-200 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border-x border-b border-b-slate-400 border-x-slate-400 col-span-6 resize-none outline-none rounded-b-lg p-2 duration-300 focus:border-slate-600"
            ></textarea>
            <div className="flex items-center justify-between px-3">
              <div className="flex gap-x-3">
                <input
                  onChange={(e) =>
                    setTodo({ ...todo, completed: e.target.checked })
                  }
                  type="checkbox"
                  checked={todo?.completed}
                />
                {todo?.completed && <p className="text-blue-600">completed</p>}
              </div>

              <button
                disabled={isloading}
                className={`bg-slate-100 ${
                  isloading && "text-green-500"
                } stroke-slate-600 border border-slate-200 col-span-2 
          flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-green-500 font-semibold
           active:stroke-blue-200 active:bg-blue-400`}
              >
                {isloading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
          <p className="text-sm text-red-400 pl-4">{isError && isError}</p>
        </div>
      )}
    </div>
  );
}
