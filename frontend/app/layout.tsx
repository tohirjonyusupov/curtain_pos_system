import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "SavdoPOS",
  description: "Point of Sale tizimi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* <Sidebar /> */}
        <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
