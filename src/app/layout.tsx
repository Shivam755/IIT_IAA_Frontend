import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CoursesProvider } from '@/app/context/CourseContext';
import { InstancesProvider } from '@/app/context/InstanceContext';
import { Toaster } from 'sonner';
import Tabs from "./components/Tabs";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CoursesProvider>
          <InstancesProvider>
            <Tabs />
            {children}
            <Toaster/>
          </InstancesProvider>
        </CoursesProvider>
      </body>
    </html>
  );
}
