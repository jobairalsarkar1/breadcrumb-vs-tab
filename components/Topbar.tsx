"use client";

import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];
  const breadcrumb = segments.length > 0 ? segments.join(" / ") : "Overview";

  return (
    <div className="h-16 bg-white shadow flex items-center px-6">
      <h2 className="text-gray-600">{breadcrumb}</h2>
    </div>
  );
}
