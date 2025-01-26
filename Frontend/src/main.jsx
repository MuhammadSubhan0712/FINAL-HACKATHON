import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Register from "../src/Pages/Register.jsx";
import Login from "../src/Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Reciept from "./Pages/Reciept.jsx";
import AdminPanel from "./Pages/AdminPanel.jsx";
import CreateGuranator from "./Pages/Guranator.jsx";
import { Provider } from "react-redux";
import { store } from "./Components/Config/stores/store.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "reciept",
        element: <Reciept />,
      },
      {
        path: "adminPanel",
        element: <AdminPanel />,
      },
      {
        path: "guranator",
        element: <CreateGuranator />,
      },
      {
        path: "*",
        element: (
          <h2 className="text-xl text-red-600 flex justify-center items-center">
            404 || Not Found{" "}
          </h2>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
