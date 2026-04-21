
//import "../../styles/global.scss";
import NavigationBar from "@/components/NavigationBar";
import SideBar from "@/components/SideBar";
import { ReactNode} from "react";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";

import { IoHomeOutline } from "react-icons/io5";


const empItems = [
  { icon: <IoHomeOutline />, label: "HOME", href: "/emp_dashboard" },
];


type SiteLayoutProps = { children: ReactNode };

export default async function SiteLayout({ children }: SiteLayoutProps) {

  const token = (await cookies()).get("jwt")?.value;

   let username: string | null = null;
  

   // Bitno za ime u navbaru

 if (token) {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64url").toString()
      );
      username = payload.username;
    } catch (e) {
      console.log("Invalid token");
    }
  }
  
 
  return (
    <>
    {/* Kasnije dodaješ kartice, tablice, grafove itd. */}
      <NavigationBar username={username}/>

      <div className="siteLayout">
        <SideBar items={empItems}/>
         <main className="siteLayoutContent">{children}
          
        </main>
         
      </div>
 
      <Footer />
    </>
  );
}