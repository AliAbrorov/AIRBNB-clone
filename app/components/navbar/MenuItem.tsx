"use client";

import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon?: IconType;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon: Icon }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 
      hover:bg-neutral-100 
      transition
      font-semibold
      ${Icon && "flex items-center justify-between"}`}
    >
      {label}
      {Icon && (
        <span className="mr-6">
          <Icon />
        </span>
      )}
    </div>
  );
};

export default MenuItem;
