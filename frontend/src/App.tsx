import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
    errorElement: <div>Oops! Something went wrong.</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
