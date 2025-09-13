import { useNavigate } from "react-router-dom";
import { assets } from "../src/assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password: pass,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password: pass,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
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
        <div>
          <div className="w-full bg-slate-900 sm:w-96 p-10 rounded-lg shadow-lg text-indigo-300 text-sm">
            <h2 className="text-3xl text-center text-white font-semibold mb-3">
              {state === "Sign Up" ? "Create account" : "Login"}
            </h2>
            <p className="text-center text-sm mb-6">
              {state === "Sign Up"
                ? "Create your account"
                : "Login to your account!"}
            </p>
            <form onSubmit={onSubmitHandler}>
              {state === "Sign Up" && (
                <div className="mb-4 flex items-center gap-2 w-full px-5 py-2.5 rounded-full bg-[#333A5C] ">
                  <label htmlFor="fullname">
                    <img
                      src={assets.person_icon}
                      alt="person-icon"
                      className=""
                    />
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="outline-none bg-transparent text-white rounded-md px-3 py-1 "
                  />
                </div>
              )}

              <div className="mb-4 flex items-center gap-2 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <label htmlFor="email">
                  <img src={assets.mail_icon} alt="email-icon" className="" />
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ID"
                  required
                  className="outline-none bg-transparent text-white rounded-md px-3 py-1 "
                />
              </div>

              <div className="mb-4 flex items-center gap-2 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <label htmlFor="pass">
                  <img src={assets.lock_icon} alt="lock-icon" className="" />
                </label>
                <input
                  type="text"
                  id="pass"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Password"
                  required
                  className="outline-none bg-transparent text-white rounded-md px-3 py-1 "
                />
              </div>
              <p
                onClick={() => navigate("/resetPass")}
                className="mb-4 w-fit text-indigo-500 cursor-pointer"
              >
                Forgot Password?
              </p>
              <button className="w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
                {state}
              </button>
            </form>
            {state === "Sign Up" ? (
              <p className="text-gray-400 text-xs text-center mt-4">
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-blue-400 underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-gray-400 text-xs text-center mt-4">
                Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-blue-400 underline cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
