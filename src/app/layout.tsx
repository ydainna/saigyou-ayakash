import type { Metadata } from 'next'
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Layout-components/Nav/Navbar";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saigyou ayakash",
  description: "Saigyou Ayakash is website for manage collection",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-body flex flex-col h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
