"use client";
import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CourseTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "Course", path: "" },
    { name: "Instance", path: "instance" },
  ];

  // Extract tab value from pathname
  const currentTab = pathname.split("/").pop() || "";

  const handleTabChange = (tab: string) => {
    router.push(`/${tab}`);
  };
  return (
    <div className="flex items-center gap-2">
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="flex gap-2"
      >
        <TabsList>
          {tabs.map((tab) => {
            return <TabsTrigger key={tab.name} id={tab.name} value={tab.path}>{tab.name}</TabsTrigger>;
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CourseTabs;
