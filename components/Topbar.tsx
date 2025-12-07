"use client";

import { X, Home } from "lucide-react";

interface Tab {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface TopbarProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
}

export default function Topbar({ tabs, activeTab, onTabClick, onTabClose }: TopbarProps) {
  return (
    <div className="h-9 flex items-center overflow-x-auto bg-white shadow">
      
      {/* HOME ICON */}
      <button
        onClick={() => onTabClick("/")}
        className="px-3 border-r border-b border-gray-400 h-full flex items-center hover:bg-gray-100 text-black"
      >
        <Home size={18} />
      </button>

      {tabs.map((tab) => {
        const isActive = activeTab === tab.path;

        return (
          <div
            key={tab.path}
            className={`flex items-center justify-between text-black gap-2 px-4 cursor-pointer 
              border-r border-gray-400 h-full w-[180px] shrink-0
              ${isActive ? "bg-gray-200 font-semibold" : "border-b bg-white hover:bg-gray-100"}
            `}
            onClick={() => onTabClick(tab.path)}
          >
            {/* ICON + NAME */}
            <div className="flex items-center gap-2 truncate">
              {tab.icon}
              <span className="truncate">{tab.name}</span>
            </div>

            <X
              className="w-4 h-4 text-gray-500 hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.path);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
