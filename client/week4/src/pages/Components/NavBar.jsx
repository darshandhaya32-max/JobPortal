import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { House, LogOut, UserPlus } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userType = null;
  let userName = null;
  let userId = null;
  const isLoggedIn = !!token;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userType = decoded.userType;
      userName = decoded.userName;
      userId = decoded.id;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/signin", { replace: true });
  };

  return (
    <div className="shadow-lg shadow-gray-900/50 ">
      <div className="bg-gray-900 text-white sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3">
          <h1 className=" text-3xl font-extrabold tracking-wider text-amber-400  cursor-pointer">
            <Link to="/">MY APP</Link>
          </h1>

          <ul className="flex space-x-5 sm:space-x-8 items-center text-sm sm:text-base">
          

            {isLoggedIn && userType === "Recruiter" && (
              <>
                <li
              className="  cursor-pointer group flex items-center gap-1 font-medium text-amber-300   border-b-2 border-transparent hover:text-amber-400  hover:border-amber-400 py-1"
              onClick={() => navigate(`/myposts/${userId}`)}
            >
              <House className="w-5 h-5 group-hover:scale-105" />
              <span className="hidden sm:inline">MyPosts</span>
            </li>
              <li
                className=" cursor-pointer font-medium text-amber-300 hover:text-amber-400  border-b-2 border-transparent hover:border-amber-400 py-1"
                onClick={() => navigate("/create")}
              >
                Add Post
              </li>
              </>
            )}

            {isLoggedIn ? (
              <>
                <li className="text-amber-300 font-semibold text-base hidden md:block">
                  Hello, {userName}!
                </li>
                <li>
                  <p
                    onClick={handleLogout}
                    className=" cursor-pointer flex items-center gap-1 bg-amber-500 text-gray-900 px-4 py-2 mt-2 rounded-full font-bold shadow-lg shadow-amber-500/50 hover:bg-amber-400"
                  >
                    <LogOut className="w-4 h-4 " />
                    Logout
                  </p>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/signin"
                  className="flex   cursor-pointer items-center gap-1 bg-amber-500 text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg shadow-amber-500/50 hover:bg-amber-400 "
                >
                  <UserPlus className="w-4 h-4" />
                  Login / Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
