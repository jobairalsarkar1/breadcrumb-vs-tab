"use client";

import { ReactNode, useState, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { FileText, LayoutGrid, MessageCircle, ShoppingBag, Users } from "lucide-react";

interface RootLayoutProps {
  children: ReactNode;
}

interface Tab {
  name: string;
  path: string;
  icon?: ReactNode;
}

// Menu items (source of truth for icons)
const menuItems: Tab[] = [
  { name: "Overview", path: "/", icon: <LayoutGrid size={15} /> },
  { name: "Users", path: "/users", icon: <Users size={15} /> },
  { name: "Products", path: "/products", icon: <ShoppingBag size={15} /> },
  { name: "Posts", path: "/posts", icon: <FileText size={15} /> },
  { name: "Blogs", path: "/blogs", icon: <FileText size={15} /> },
  { name: "Comments", path: "/comments", icon: <MessageCircle size={15} /> },
];

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname() || "/";

  // --- Persistent Tabs State ---
  const [tabs, setTabs] = useState<Tab[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("tabs");
    if (!saved) return [];
    const parsed: { name: string; path: string }[] = JSON.parse(saved);
    // Restore icons from menuItems
    return parsed.map(t => menuItems.find(m => m.path === t.path) || t);
  });

  // Current tab memoized
  const currentTab = useMemo(() => {
    return menuItems.find((m) => m.path === pathname) || null;
  }, [pathname]);

  // --- Add current tab if not present ---
  useEffect(() => {
    if (!currentTab) return;

    queueMicrotask(() => {
      setTabs(prev => {
        const exists = prev.some(t => t.path === currentTab.path);
        return exists ? prev : [...prev, currentTab];
      });
    });
  }, [currentTab]);

  // --- Persist tabs to localStorage ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tabsToSave = tabs.map(t => ({ name: t.name, path: t.path }));
    localStorage.setItem("tabs", JSON.stringify(tabsToSave));
  }, [tabs]);

  // --- Tab handlers ---
  const handleTabOpen = (path: string) => {
    const tab = menuItems.find((m) => m.path === path);
    if (!tab) return;

    setTabs(prev => {
      const exists = prev.some(t => t.path === tab.path);
      return exists ? prev : [...prev, tab];
    });

    router.push(path);
  };

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  const handleTabClose = (path: string) => {
    setTabs(prev => {
      const index = prev.findIndex(t => t.path === path);
      const updated = prev.filter(t => t.path !== path);

      if (pathname === path) {
        const next = updated[index] || updated[index - 1];
        router.push(next ? next.path : "/");
      }

      return updated;
    });
  };

  // --- Optional Reset Tabs ---
  const resetTabs = () => {
    setTabs([]);
    localStorage.removeItem("tabs");
    router.push("/");
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

        <main className="flex-1 bg-gray-200 h-[calc(100vh - 36px)] overflow-auto">{children}</main>
      </div>
    </div>
  );
}
