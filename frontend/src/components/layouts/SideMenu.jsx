import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../Utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { LuLogOut } from "react-icons/lu";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleClick = (route) => {
    if (route === "logout") {
      handellogout();
      return;
    }
    navigate(route);
  };

  const handellogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/signup");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 flex flex-col">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || " "}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (<CharAvatar
        
        fullName = {user?.fullName}
        width="w-20"
        height="h-20"
        style="text-xl"
               />
       
       
       )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      <div className="flex-1">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 tex-[15px] ${
              activeMenu === item.label ? "text-white bg-primary" : ""
            } py-3 px-6 rounded-lg mb-3`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          className="w-full flex items-center gap-4 text-[15px] text-red-600 py-3 px-6 rounded-lg mb-3"
          onClick={() => handleClick("logout")}
        >
          <LuLogOut className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideMenu;