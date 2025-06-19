"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CourseTabs = () => {
  const { setTheme } = useTheme();
  const tabs = [
    { name: "Course", path: "/" },
    { name: "Instance", path: "/instance" },
  ];

  return (
    <div id="Nav-Bar" className="w-screen shadow-2xl">
      <NavigationMenu id="Nav-Menu" className="w-screen max-w-none flex justify-between dark:bg-white dark:text-black bg-black text-white border-b px-4 py-2 shadow">
        <NavigationMenuList>
          <div className="flex justify-around">
            {tabs.map((tab) => {
            return (
              <NavigationMenuItem key={tab.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={tab.path}
                    className={cn(
                      "px-3 py-2 rounded-md font-medium",
                      "hover:bg-gray-200 dark:hover:bg-gray-800"
                    )}
                  >
                    {tab.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
          </div>
          
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className={cn(
                  "px-3 py-2 rounded-md font-medium",
                  "hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200",
                  "dark:bg-white dark:text-black bg-black text-white"
                )} size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={cn(
                  "px-3 py-2 rounded-md font-medium",
                  "dark:bg-white dark:text-black bg-black text-white"
                )}
              >
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default CourseTabs;
