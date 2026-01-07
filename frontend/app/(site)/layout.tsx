
import "../../styles/global.scss";
import NavigationBar from "@/components/NavigationBar";
import SideBar from "@/components/SideBar";
import { ReactNode, useEffect, useState } from "react";
import Dashboard from "./dashboard/page";
import axios from "axios";
import api from "@/lib/api";
import { cookies } from "next/headers";
import WorldMap from "@/components/WorldMap";
import Footer from "@/components/Footer";





type SiteLayoutProps = { children: ReactNode };

export default async function SiteLayout({ children }: SiteLayoutProps) {

  const token = (await cookies()).get("jwt")?.value;

   let username: string | null = null;
  

   // SKONTAT OVO PARSIRANJE TOKENA

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
        <SideBar />
         <main className="siteLayoutContent">{children}
          
        </main>
         
      </div>
 
      <Footer />
    </>
  );
}
