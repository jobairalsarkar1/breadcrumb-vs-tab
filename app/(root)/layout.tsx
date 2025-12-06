import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
