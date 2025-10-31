import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import UserLogin from "./routes/UserLogin.jsx";
import "./index.css";
import ShapevMain from "./routes/ShapevMain.jsx";
import MainDashboard from "./components/MainDashboard.jsx";
import TrainneLayout from "./components/TrainneLayout.jsx";
import DietsLayout from "./components/DietsLayout.jsx";
import WorkoutsDashboard from "./subcomponents/WorkoutsDashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/home",
    element: <ShapevMain />,
    children: [
      {
        path: "/home",
        element: <MainDashboard />,
      },
      {
        path: "/home/workouts",
        element: <TrainneLayout />,
      },
      {
        path: "/home/diets",
        element: <DietsLayout />,
      },
      {
        path: "/home/workouts/exercise/:id",
        element: <WorkoutsDashboard />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
