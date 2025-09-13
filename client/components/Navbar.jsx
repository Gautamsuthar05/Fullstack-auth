import { useContext } from "react";
import { assets } from "../src/assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedIn, setUserData } =
    useContext(AppContext);

  // const navigateToVerifyEmailPage = async () => {
  //   navigate("/verifyEmail")
  // }
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/sendVerifyOtp");
      if (data.success) {
        navigate("/verifyEmail");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
};
  
  return (
    <>
      <div className="flex justify-between items-center w-full p-4 sm:p-6 sm:px-24 absolute top-0">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />
        {userData ? (
          <div className="w-8 h-8 flex justify-center items-center bg-black text-white relative rounded-full group">
            {userData.name[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
              <ul className="m-0 p-2 list-none text-sm bg-gray-100">
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Verify Email
                  </li>
                )}

                <li
                  onClick={logout}
                  className="py-1 px-2 pr-10 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <NavLink to={"/login"}>
            <button className="flex items-center gap-2 border border-gray-500m px-4 py-2 text-gray-800 rounded-full hover:bg-gray-100 transition-all">
              Login <img src={assets.arrow_icon} alt="rightArrow" />
            </button>
          </NavLink>
        )}
      </div>
    </>
  );
};

export default Navbar;
