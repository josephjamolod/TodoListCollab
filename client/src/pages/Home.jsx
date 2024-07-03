import { useEffect, useState } from "react";
import { account } from "../appwrite/config";
import Todos from "../components/Todos";
import db from "../appwrite/databases";

//redux
import { useSelector } from "react-redux";
import Skeleton from "../loaderComponents/Skeleton";
import FetchError from "../loaderComponents/FetchError";
import { Query } from "appwrite";

export default function Home() {
  const { latest } = useSelector((state) => state.user);
  const query = latest
    ? [Query.orderDesc("$createdAt")]
    : [Query.orderAsc("$createdAt")];
  // console.log(latest);
  // const [filter, setFilter] = useState([Query.orderDesc("$createdAt")]);
  const [todo, setTodo] = useState({ title: "", task: "", completed: false });
  const [todos, setTodos] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  //fetch data loader and error
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  // console.log(filter);

  useEffect(() => {
    init();
  }, [latest]);

  const init = async () => {
    setFetchError(false);
    setFetchLoading(true);
    try {
      const response = await db.tasks.list(query);
      setTodos(response.documents);
      setFetchLoading(false);
    } catch (error) {
      // console.log(error);
      setFetchError(true);
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo.title === "" || todo.task === "") {
      return;
    }
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await db.tasks.create(todo);
      setTodos([response, ...todos]);
      setTodo({ title: "", task: "", completed: false });
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
    <main className="flex flex-col  items-center   pt-10 md:pt-20 overflow-hidden h-auto">
      <h1 className="text-sm text-red-400">{isError && isError}</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 w-full max-w-[400px] gap-2 rounded-xl p-2 text-sm"
      >
        <h1 className="text-center text-slate-400 text-xl font-bold col-span-6">
          Add Todo
        </h1>
        <input
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          placeholder="Title here..."
          className="w-full mt-3 bg-slate-200 text-slate-600  placeholder:text-slate-600 placeholder:opacity-50 border border-slate-400 col-span-6 resize-none outline-none rounded-t-lg p-2 duration-300 focus:border-slate-600"
        />
        <textarea
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
          placeholder="Type here..."
          className="w-full  bg-slate-200 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border-x border-b border-b-slate-400 border-x-slate-400 col-span-6 resize-none outline-none rounded-b-lg p-2 duration-300 focus:border-slate-600"
        ></textarea>
        <div className="flex items-center justify-between px-3">
          <div className="flex gap-x-3">
            <input
              checked={todo.completed}
              type="checkbox"
              onChange={(e) =>
                setTodo({ ...todo, completed: e.target.checked })
              }
            />
            {todo.completed && <p className="text-blue-600">completed</p>}
          </div>

          <button
            disabled={isloading}
            className="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 
          flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white
           active:stroke-blue-200 active:bg-blue-400 disabled:opacity-80"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M10.11 13.6501L13.69 10.0601"
              ></path>
            </svg>
          </button>
        </div>
      </form>
      {/* <FetchError /> */}
      {fetchLoading ? (
        <Skeleton />
      ) : fetchError ? (
        <FetchError />
      ) : (
        <Todos
          todos={todos}
          setTodos={setTodos}
          // filter={filter}
          // setFilter={setFilter}
        />
      )}
    </main>
  );
}
