import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "JMD Growth Engine",
  description: "Internal growth operating system for JMD Tech products."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
