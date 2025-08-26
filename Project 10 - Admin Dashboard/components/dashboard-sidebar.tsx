import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, BarChart3, Settings, FileText, Home, Shield } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: SidebarProps) {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
      active: false,
    },
    {
      title: "Users",
      icon: Users,
      href: "/users",
      active: true,
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: false,
    },
    {
      title: "Reports",
      icon: FileText,
      href: "/reports",
      active: false,
    },
    {
      title: "Security",
      icon: Shield,
      href: "/security",
      active: false,
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      active: false,
    },
  ]

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  item.active && "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
