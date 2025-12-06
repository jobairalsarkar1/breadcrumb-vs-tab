"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  ShoppingBag,
  FileText,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: "Overview", icon: <LayoutGrid size={20} />, path: "/" },
  { name: "Users", icon: <Users size={20} />, path: "/users" },
  { name: "Products", icon: <ShoppingBag size={20} />, path: "/products" },
  { name: "Posts", icon: <FileText size={20} />, path: "/posts" },
  { name: "Blogs", icon: <FileText size={20} />, path: "/blogs" },
  { name: "Comments", icon: <MessageSquare size={20} />, path: "/comments" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-semibold">Dashboard</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className={`${collapsed && "w-full flex items-center justify-center"}`}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              href={item.path}
              key={item.name}
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 transition ${collapsed && "justify-center"} ${
                isActive ? "bg-gray-800 font-semibold" : ""
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
