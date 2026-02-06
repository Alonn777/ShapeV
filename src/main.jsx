import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import { BodyDataContextProvider } from "./context/BodyDataContext.jsx";
import App from "./App.jsx";
import UserLogin from "./routes/UserLogin.jsx";
import "./index.css";
import ShapevMain from "./routes/ShapevMain.jsx";
import MainDashboard from "./routes/MainDashboard.jsx";
import TrainneLayout from "./routes/TrainneLayout.jsx";
import DietsLayout from "./routes/DietsLayout.jsx";
import BodyData from "./routes/BodyData.jsx";
import WorkoutsDashboard from "./components/WorkoutsDashboard.jsx";
import Admin from "./routes/Admin.jsx";
import Config from "./routes/Config.jsx";
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
    path: "/admin",
    element: <Admin />,
  },
  { path: "config", element: <Config /> },
  {
    path: "/home",
    element: <ShapevMain />,
    children: [
      {
        path: "/home",
        element: <MainDashboard />,
      },
      {
        path: "/home/workouts/:bodydataID",
        element: <TrainneLayout />,
      },
      {
        path: "/home/diets/:id",
        element: <DietsLayout />,
      },
      {
        path: "/home/bodydata/:id",
        element: <BodyData />,
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
    <BodyDataContextProvider>
      <RouterProvider router={router} />
    </BodyDataContextProvider>
  </StrictMode>,
);
