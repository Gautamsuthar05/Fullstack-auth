import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ResetPass from "../pages/ResetPass";
import VerifyEmail from "../pages/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPass" element={<ResetPass />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
      </Routes>
    </>
  );
};

export default App;
