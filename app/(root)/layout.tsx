"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

interface RootLayoutProps {
  children: ReactNode;
}

interface Tab {
  name: string;
  path: string;
}

// Define all menu items
const menuItems: Tab[] = [
  { name: "Overview", path: "/" },
  { name: "Users", path: "/users" },
  { name: "Products", path: "/products" },
  { name: "Posts", path: "/posts" },
  { name: "Blogs", path: "/blogs" },
  { name: "Comments", path: "/comments" },
];

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const [tabs, setTabs] = useState<Tab[]>([]);

  // Ensure the current route is always a tab
  useEffect(() => {
    const currentTab = menuItems.find((m) => m.path === pathname);
    if (currentTab && !tabs.find((t) => t.path === currentTab.path)) {
      setTabs((prev) => [...prev, currentTab]);
    }
  }, [pathname, tabs]);

  const handleTabOpen = (path: string) => {
    const tab = menuItems.find((m) => m.path === path);
    if (tab && !tabs.find((t) => t.path === tab.path)) {
      setTabs((prev) => [...prev, tab]);
    }
    router.push(path); // navigate to route
  };

  const handleTabClick = (path: string) => {
    router.push(path); // navigate to route
  };

  const handleTabClose = (path: string) => {
    setTabs((prev) => prev.filter((t) => t.path !== path));
    if (pathname === path) {
      const remainingTabs = tabs.filter((t) => t.path !== path);
      router.push(remainingTabs.length ? remainingTabs[remainingTabs.length - 1].path : "/");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar onTabOpen={handleTabOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar tabs={tabs} activeTab={pathname} onTabClick={handleTabClick} onTabClose={handleTabClose} />
        <main className="flex-1 bg-gray-200 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
