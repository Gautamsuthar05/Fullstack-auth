import { useContext, useEffect, useRef } from "react";
import { assets } from "../src/assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiox from "axios";
import { AppContext } from "../context/AppContext";
const VerifyEmail = () => {
  axiox.defaults.withCredentials = true;
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { backendUrl, getUserData, isLoggedIn, userData } =
    useContext(AppContext);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [isLoggedIn]);
  
  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axiox.post(backendUrl + "/api/auth/verifyEmail", {
        otp,
      });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedIn, userData]);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
        <img
          src={assets.logo}
          alt=""
          onClick={() => navigate("/")}
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        />
        <form
          onSubmit={onsubmitHandler}
          className="p-8 bg-slate-900 shadow-lg rounded-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl text-center mb-4 font-semibold">
            Email Verify OTP
          </h1>
          <p className="mb-6 text-center text-indigo-300">
            Enter the 6-digit code sent to your email id.
          </p>
          <div className="flex justify-between mb-8">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  required
                  key={index}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  onPaste={handlePaste}
                  ref={(e) => (inputRefs.current[index] = e)}
                  className="w-12 h-12 bg-[#333A5C] text-white text-center rounded-md"
                />
              ))}
          </div>
          <button className="py-3 w-full text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900">
            Verify
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyEmail;
