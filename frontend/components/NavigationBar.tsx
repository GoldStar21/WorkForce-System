"use client";
import { MdConstruction } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotificationHook } from "@/hooks/useNotificationHook";

interface NavbarProps {
  username: string | null;
}

const NavigationBar = ({ username }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const { cars, isOpenNotification, setOpenNotification } =
    useNotificationHook();

  return (
    <header className="header">
      <div className="header__content">
        <div
          className="header__leftSide"
          onClick={() => router.push("/dashboard")}
        >
          <MdConstruction className="header__logo" />
          <h1 className="header__title">WorkForce SYSTEM</h1>
        </div>






        <div className="header__rightSide">
          <div
            className="header__notificationWrapper"
            onClick={() => setOpenNotification((prev) => !prev)}
          >
            <IoNotifications className="header__icon" />
            {cars.length > 0 && (
              <span className="header__badge">{cars.length}</span>
            )}

            {isOpenNotification && (
              <ul className="header__notify">
                {cars.map((car) => (
                  <ul key={car.id} className="header__notifyItem">
                    <li className="header__notifyTitle">
                      TuV EXPIRES : "{car.make} {car.model}" on {new Date(car.tuv).toLocaleDateString("en-GB").replace(/\//g,".")}
                    </li>
                  </ul>
                ))}
              </ul>
            )}
          </div>







          <FaUser className="header__icon" />
          <h2 className="header__username">{username ?? "Guest"}</h2>
        </div>

        <LuMenu
          className="header__hamburgerIcon"
          onClick={() => setMobileOpen(!mobileOpen)}
        />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`header__mobileSideMenu ${
          mobileOpen ? "header__mobileSideMenu--open" : ""
        }`}
      >
        <FaUser className="header__icon" />
        <IoNotifications className="header__icon" />
      </div>
    </header>
  );
};
export default NavigationBar;
