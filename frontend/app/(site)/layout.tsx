//import "../../styles/global.scss";
import NavigationBar from "@/components/NavigationBar";
import SideBar from "@/components/SideBar";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";

import { TbUsersPlus } from "react-icons/tb";
import { PiCar } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";
import { redirect } from "next/navigation";

const adminItems = [
  { icon: <IoHomeOutline  className="sidebar__icon"/>, label: "HOME", href: "/dashboard" },
  { icon: <TbUsersPlus  className="sidebar__icon"/>, label: "EMPLOYEES", href: "/employees" },
  { icon: <PiCar  className="sidebar__icon"/>, label: "CARS", href: "/cars" },
  { icon: <TbUsersGroup  className="sidebar__icon"/>, label: "GROUPS", href: "/groups" },
];

type SiteLayoutProps = { children: ReactNode };

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const token = (await cookies()).get("jwt")?.value;

   if (!token) {
    redirect("/");
  }

  let username: string | null = null;

  // SKONTAT OVO PARSIRANJE TOKENA
  if (token) {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64url").toString(),
      );
      username = payload.username;
    } catch (e) {
      console.log("Invalid token");
    }
  }

  return (
    <>
      {/* Kasnije dodaješ kartice, tablice, grafove itd. */}
      <NavigationBar username={username} />

      <div className="siteLayout">
        <SideBar items={adminItems} />
        <main className="siteLayoutContent">{children}</main>
      </div>

      <Footer />
    </>
  );
}
