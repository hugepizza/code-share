import type { Metadata, Viewport } from "next";
import "./globals.css";
import Topbar from "./components/topbar/Topbar";
import SessionProvider from "./providers/nextauth";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Fast Share Code: Grab & Share Promo, Invitation, and Discount Codes",
  description:
    "Discover the latest promo codes or share your own! Dive into a user-friendly platform to grab codes without login, or sign up to personalize and curate your collection.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html className="h-full max-w-full" lang="en">
        <body className="flex flex-col">
          <Toaster />
          <Topbar />

          <main
            className="flex my-2 pb-2 bg-white flex-col items-center  shadow-md"
            style={{
              marginLeft: "var(--page-padding)",
              marginRight: "var(--page-padding)",
            }}
          >
            {children}
          </main>
        </body>
      </html>
    </SessionProvider>
  );
}
