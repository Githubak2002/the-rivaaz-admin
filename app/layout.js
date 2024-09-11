import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";

// react hot toast
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "The rivaaz Admin",
  description: "Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <section className="mx-auto max-w-7xl">
            <NavBar />
            {children}
          </section>
          {/* === toast === */}
          <Toaster />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
