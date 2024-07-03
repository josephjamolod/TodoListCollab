import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//root layout
import RootLayout from "./rootLayout/RootLayout";

//pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import EditTodo from "./pages/EditTodo";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route index element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/editTodo/:id" element={<EditTodo />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
