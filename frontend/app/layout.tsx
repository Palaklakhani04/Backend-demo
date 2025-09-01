import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/lib/Providers";
import Navbar from "@/component/common/Navbar";



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
         <Toaster position="top-right" />
        {children}
        </Providers>
      </body>
    </html>
  );
}
