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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ index: true, element: <Home /> }],
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
