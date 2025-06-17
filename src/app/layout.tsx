import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CoursesProvider } from "@/app/context/CourseContext";
import { InstancesProvider } from "@/app/context/InstanceContext";
import { Toaster } from "sonner";
import CourseTabs from "./components/Tabs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IIT IAA UI",
  description: "Frontend for IIT Internship Application Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-4 max-w-xl mx-auto p-4">
        <CoursesProvider>
          <InstancesProvider>
            <CourseTabs />
            {children}
            <Toaster />
          </InstancesProvider>
        </CoursesProvider>
      </body>
    </html>
  );
}
