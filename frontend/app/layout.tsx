import "../styles/global.scss";
import { ReactNode } from 'react';
import { Toaster } from "react-hot-toast";
// Import for maps
import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: "WorkForce SYSTEM",
};


type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">

      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#e6e6e6" />
      </head>
      
      <body>
        <Toaster position="top-center" />
        
        {children}
        </body>
    </html>
  );
}
