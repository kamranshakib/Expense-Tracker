import React from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../Utils/data";

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 min-h-screen border-r p-4 bg-white">
      <ul className="space-y-2">
        {SIDE_MENU_DATA.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[15px]
                ${
                  activeMenu === item.label
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {Icon && <Icon size={18} />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default SideMenu;
