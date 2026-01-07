import "../styles/global.scss";
import { ReactNode } from 'react';
import { Toaster } from "react-hot-toast";
// Import for maps
import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: "My App",
};


type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      
      <body>
        <Toaster position="top-center" />
        
        {children}
        </body>
    </html>
  );
}
