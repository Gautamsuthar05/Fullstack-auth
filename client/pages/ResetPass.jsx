import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../src/assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const ResetPass = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState();
  const [isOtpSubmitted, setIsOtpSubmitted] = useState("");
  const inputRefs = useRef([]);
  const { backendUrl } = useContext(AppContext);

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

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(backendUrl + "/api/auth/resetPassOtp", {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitPass = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(backendUrl + "/api/auth/resetPass", {
        email,
        otp,
        newPassword: pass,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
        <img
          src={assets.logo}
          alt=""
          onClick={() => navigate("/")}
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        />

        {/*------------------ send reset password otp via email --------------------------------*/}

        {!isEmailSent && (
          <form
            onSubmit={onSubmitEmail}
            className="p-8 bg-slate-900 shadow-lg rounded-lg w-96 text-sm"
          >
            <h1 className="text-white text-2xl text-center mb-4 font-semibold">
              Reset Password
            </h1>
            <p className="mb-6 text-center text-indigo-300">
              Enter your registered email address.
            </p>
            <div className="w-full px-5 py-2.5 mb-4 flex items-center gap-3 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="" className="w-3 h-3" />
              <input
                type="email"
                placeholder="Email id"
                className="bg-transparent w-full py-1 outline-none text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-900 py-2.5 text-center text-sm text-white mt-3 rounded-full">
              Submit
            </button>
          </form>
        )}

        {/* ----------------------------- Enter reset password otp --------------------------- */}
        {!isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitOtp}
            className="p-8 bg-slate-900 shadow-lg rounded-lg w-96 text-sm"
          >
            <h1 className="text-white text-2xl text-center mb-4 font-semibold">
              Reset Password OTP
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
            <button className="py-2.5 w-full text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900">
              Verify
            </button>
          </form>
        )}

        {/* --------------------------- enter new password ----------------------------*/}

        {isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitPass}
            className="p-8 bg-slate-900 shadow-lg rounded-lg w-96 text-sm"
          >
            <h1 className="text-white text-2xl text-center mb-4 font-semibold">
              New Password
            </h1>
            <p className="mb-6 text-center text-indigo-300">
              Enter your new password here.
            </p>
            <div className="w-full px-5 py-2.5 mb-4 flex items-center gap-3 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" className="w-3 h-3" />
              <input
                type="text"
                placeholder="Password"
                className="bg-transparent w-full py-1 outline-none text-white"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-900 py-2.5 text-center text-sm text-white mt-3 rounded-full">
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export default ResetPass;
