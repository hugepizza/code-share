import type { Metadata } from "next";
import "./globals.css";
import Topbar from "./components/topbar/Topbar";

export const metadata: Metadata = {
  title: "Share Code",
  description: "Share your application code",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body className="flex flex-col h-full ">
        <Topbar />

        <main
          className="flex my-1 h-full bg-white flex-col items-center  shadow-md"
          style={{
            marginLeft: "var(--page-padding)",
            marginRight: "var(--page-padding)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
