import AppRouter from "./AppRouter";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="font-sans text-lg">
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        style={{ zIndex: 99999 }}
      />
    </div>
  );
};

export default App;
