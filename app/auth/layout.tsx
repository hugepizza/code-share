import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Share Code",
  description: "Share your application code",
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
  return <main>{children}</main>;
}
