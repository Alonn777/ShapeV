import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="buttom-center" />
      <Outlet />
    </>
  );
}

export default App;
