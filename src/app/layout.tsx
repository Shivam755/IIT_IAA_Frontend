import type { Metadata } from "next";
import { CoursesProvider } from "@/app/context/CourseContext";
import { InstancesProvider } from "@/app/context/InstanceContext";
import { Toaster } from "sonner";
import CourseTabs from "./components/Tabs";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ToastProvider } from "./components/ToastProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CourseTabs />
          <CoursesProvider>
            <InstancesProvider>
              <div className="flex flex-col gap-4 max-w-xl mx-auto p-4">
                {children}
              </div>
              <ToastProvider />
            </InstancesProvider>
          </CoursesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
