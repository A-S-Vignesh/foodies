"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChefHat,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Menu Items", href: "/admin/menu", icon: UtensilsCrossed },
  { label: "Restaurants", href: "/admin/restaurants", icon: ChefHat },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-950 text-white border-r border-zinc-800 flex flex-col z-50">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-zinc-800/50">
        <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
          <UtensilsCrossed className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg tracking-tight">Foodie Admin</span>
      </div>

      {/* Nav */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-white"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer User Profile */}
      <div className="p-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-zinc-500 truncate">Admin</p>
          </div>
          <button className="text-zinc-500 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
