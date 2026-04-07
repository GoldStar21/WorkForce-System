"use client";

import { logout } from "@/lib/services/auth_service";
import { TbUsersPlus } from "react-icons/tb";
import { PiCar } from "react-icons/pi";
import { TbUsersGroup } from "react-icons/tb";
import { GrLogout } from "react-icons/gr";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";

const SideBar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar__openClose">
        <FaArrowsLeftRightToLine
          className="sidebar__arrows"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      <div className="sidebar__menu">
        <div
          className="sidebar__item"
          onClick={() => router.push("/dashboard")}
        >
          <IoHomeOutline className="sidebar__icon" />
          {<span className="sidebar__text">HOME</span>}
        </div>

        <div
          className="sidebar__item"
          onClick={() => router.push("/employees")}
        >
          <TbUsersPlus className="sidebar__icon" />
          {<span className="sidebar__text">EMPLOYEES</span>}
        </div>

        <div className="sidebar__item" onClick={() => router.push("/cars")}>
          <PiCar className="sidebar__icon" />
          {<span className="sidebar__text">CARS</span>}
        </div>
        <div className="sidebar__item" onClick={() => router.push("/groups")}>
          <TbUsersGroup className="sidebar__icon" />
          {<span className="sidebar__text">GROUPS</span>}
        </div>
      </div>

      <div className="sidebar__logout">
        <div className="sidebar__item" onClick={handleLogout}>
          <GrLogout className="sidebar__logoutIcon" />
          {<span className="sidebar__text">Logout</span>}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
