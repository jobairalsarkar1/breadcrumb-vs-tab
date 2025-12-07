"use client";

import { ReactNode, useState, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { File, Home, MessageCircle, ShoppingBag, Users } from "lucide-react";

interface RootLayoutProps {
  children: ReactNode;
}

interface Tab {
  name: string;
  path: string;
  icon?: ReactNode;
}

const menuItems: Tab[] = [
  { name: "Overview", path: "/", icon: <Home size={18} /> },
  { name: "Users", path: "/users", icon: <Users size={18} /> },
  { name: "Products", path: "/products", icon: <ShoppingBag size={18} /> },
  { name: "Posts", path: "/posts", icon: <File size={18} /> },
  { name: "Blogs", path: "/blogs", icon: <File size={18} /> },
  { name: "Comments", path: "/comments", icon: <MessageCircle size={18} /> },
];

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const [tabs, setTabs] = useState<Tab[]>([]);

  // Get current tab object (safe + memoized)
  const currentTab = useMemo(() => {
    return menuItems.find((m) => m.path === pathname) || null;
  }, [pathname]);

  // ----- FIXED EFFECT -----
  useEffect(() => {
    if (!currentTab) return;

    queueMicrotask(() => {
      setTabs((prev) => {
        const exists = prev.some((t) => t.path === currentTab.path);
        return exists ? prev : [...prev, currentTab];
      });
    });
  }, [currentTab]);

  const handleTabOpen = (path: string) => {
    const tab = menuItems.find((m) => m.path === path);
    if (!tab) return;

    setTabs((prev) => {
      const exists = prev.some((t) => t.path === tab.path);
      return exists ? prev : [...prev, tab];
    });

    router.push(path);
  };

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  const handleTabClose = (path: string) => {
    setTabs((prev) => {
      const index = prev.findIndex((t) => t.path === path);
      const updated = prev.filter((t) => t.path !== path);

      if (pathname === path) {
        const next = updated[index] || updated[index - 1];
        router.push(next ? next.path : "/");
      }

      return updated;
    });
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar onTabOpen={handleTabOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          tabs={tabs}
          activeTab={pathname}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
        />

        <main className="flex-1 bg-gray-200 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
