import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Code",
  description: "Share your application code",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
