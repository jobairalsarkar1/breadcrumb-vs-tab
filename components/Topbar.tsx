"use client";

import { X } from "lucide-react";

interface Tab {
  name: string;
  path: string;
}

interface TopbarProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (path: string) => void;
  onTabClose: (path: string) => void;
}

export default function Topbar({ tabs, activeTab, onTabClick, onTabClose }: TopbarProps) {
  return (
    <div className="h-14 flex items-stretch overflow-x-auto bg-white shadow">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.path;

        return (
          <div
            key={tab.path}
            className={`flex items-center justify-between px-4 cursor-pointer select-none border-r border-b w-[200px] flex-shrink-0 ${
              isActive ? "bg-gray-200 border-transparent font-semibold" : "bg-white border-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => onTabClick(tab.path)}
          >
            <span className="text-black mr-2 truncate">{tab.name}</span>
            {!isActive && (
              <X
                className="w-4 h-4 text-gray-500 hover:text-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.path);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
