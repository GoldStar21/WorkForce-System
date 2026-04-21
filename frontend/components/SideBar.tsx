"use client";

import { logout } from "@/lib/services/auth_service";
import { GrLogout } from "react-icons/gr";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface SidebarItem {
  icon: ReactNode;
  label: string;
  href: string;
}

const SideBar = ({ items }: { items: SidebarItem[] }) => {
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
        {items.map((item) => (
          <div
            className="sidebar__item"
            key={item.href}
            onClick={() => router.push(item.href)}
          >
            {item.icon}
            <span className="sidebar__text">{item.label}</span>
          </div>
        ))}
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
