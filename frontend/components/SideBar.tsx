"use client";

import { logout } from "@/lib/services/auth_service";
import { FaUser } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoHome } from "react-icons/io5";


const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
/*
    In production, this useEffect has no real purpose.
    Its main role is to manage state during development,
    specifically for testing responsiveness when switching
    bezween mobile and desktop views.
  */
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth > 900) {
        setIsCollapsed(false);
      }
    };

    resize();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
  try {
    await logout(); // poziva tvoj backend
    router.push("/"); // preusmjeri usera
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  

  return (
    <aside className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar__openClose">
        <FaArrowsLeftRightToLine
          className="sidebar__arrows"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      </div>
      

      <div className="sidebar__menu">

 <div className="sidebar__home" onClick={() => router.push("/dashboard")}>
          <IoHome className="sidebar__icon" />
          {!isCollapsed && <span className="sidebar__text">HOME</span>}
        </div>

        <div className="sidebar__item" onClick={() => router.push("/employees")}>
          <FaUser className="sidebar__icon" />
          {!isCollapsed && <span className="sidebar__text">Employees</span>}
        </div>
       {/* 
        <div className="sidebar__item">
          <FaUser className="sidebar__icon" />
          {!isCollapsed && <span className="sidebar__text">Electricians - DEL</span>}
        </div>
        */}
        <div className="sidebar__item" onClick={() => router.push("/cars")}>
          <FaCarAlt className="sidebar__icon" />
          {!isCollapsed && <span className="sidebar__text">Cars</span>}
        </div>
        <div className="sidebar__item" onClick={() => router.push("/groups")}>
          <FaUsers className="sidebar__icon" />
          {!isCollapsed && <span className="sidebar__text">Groups</span>}
        </div>
      </div>

      <div className="sidebar__logout">
        <div className="sidebar__item" onClick={handleLogout}>
          <GrLogout className="sidebar__icon"/>
          {!isCollapsed && <span className="sidebar__text">Logout</span>}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
