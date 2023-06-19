import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login, { loader as loginLoader } from "./pages/auth/Login";
import SignUp, { loader as signupLoader } from "./pages/auth/Signup";
import Root from "./pages/Root";
import AuthRoot from "./pages/auth/AuthRoot";
import ForgetPassword, {
  loader as forgetPasswordLoader,
} from "./pages/auth/ForgetPassword";
import EmailVerification from "./pages/auth/EmailVerification";
import ResetPassword, {
  loader as resetPasswordLoader,
} from "./pages/auth/ResetPassword";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import Actors from "./pages/admin/Actors";
import Movies from "./pages/admin/Movies";
import AdminRoot from "./pages/admin/AdminRoot";
import SearchMovie from "./pages/admin/SearchMovie";
import SingleMedia from "./pages/user/SingleMedia";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "media/:mediaId", element: <SingleMedia /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "actors", element: <Actors /> },
      { path: "movies", element: <Movies /> },
      { path: "search", element: <SearchMovie /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthRoot />,
    children: [
      { path: "login", element: <Login />, loader: loginLoader },
      {
        path: "forget-password",
        element: <ForgetPassword />,
        loader: forgetPasswordLoader,
      },
      { path: "sign-up", element: <SignUp />, loader: signupLoader },
      {
        path: "verification",
        element: <EmailVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
        loader: resetPasswordLoader,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
