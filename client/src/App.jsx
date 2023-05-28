import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Root from "./pages/Root";
import AuthRoot from "./pages/auth/AuthRoot";
import ForgetPassword from "./pages/auth/ForgetPassword";
import EmailVerification from "./pages/auth/EmailVerification";
import ResetPassword from "./pages/auth/ResetPassword";

const router = createBrowserRouter([
  { path: "/", element: <Root />, children: [] },
  {
    path: "/auth",
    element: <AuthRoot />,
    children: [
      { path: "login", element: <Login /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "verification", element: <EmailVerification /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
