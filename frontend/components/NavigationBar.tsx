"use client";
import { MdConstruction } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useNotificationHook } from "@/hooks/useNotificationHook";

interface NavbarProps {
  username: string | null;
}

const NavigationBar = ({ username }: NavbarProps) => {
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
                  <li key={car.id} className="header__notifyItem">
                    <div className="header__notifyTitle">
                      {car.make} {car.model}
                    </div>

                    <div className="header__notifyDate">
                      TUV expires:{" "}
                      {new Date(car.tuv)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, ".")}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FaUser className="header__icon" />
          <h2 className="header__username">{username ?? "Guest"}</h2>
        </div>
      </div>
    </header>
  );
};
export default NavigationBar;
