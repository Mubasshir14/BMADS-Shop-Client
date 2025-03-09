"use client";
import * as React from "react";
import { Bot, Settings, SquareTerminal } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useUser } from "@/components/context/UserContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const navMain =
    user?.role === "admin"
      ? [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Product",
            url: "/dashboard/admin/product/manage-product",
            icon: Bot,
            items: [
              {
                title: "Manage Product",
                url: "/dashboard/admin/product/manage-product",
              },
              {
                title: "Add Product",
                url: "/dashboard/admin/product/add-product",
              },
              {
                title: "Manage Order",
                url: "/dashboard/admin/order/manage-order",
              },
            ],
          },
          {
            title: "Category",
            url: "/dashboard/admin/category/manage-category",
            icon: Bot,
            items: [
              {
                title: "Manage Category",
                url: "/dashboard/admin/category/manage-category",
              },
              {
                title: "Add Category",
                url: "/dashboard/admin/category/add-category",
              },
            ],
          },
          {
            title: "Coupon",
            url: "/dashboard/admin/coupon/manage-coupon",
            icon: Bot,
            items: [
              {
                title: "Manage Coupon",
                url: "/dashboard/admin/coupon/manage-coupon",
              },
              {
                title: "Add Coupon",
                url: "/dashboard/admin/coupon/add-coupon",
              },
            ],
          },
        ]
      : user?.role === "user"
      ? [
          {
            title: "Profile",
            url: "/profile",
            icon: Settings,
          },
        ]
      : [
          {
            title: "Dashboard",
            url: "/admin",
            icon: SquareTerminal,
            isActive: true,
          },
        ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-red-100/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center"></div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="font-bold text-xl">
                    <Link href="/" className=" text-2xl font-bold">
                      <div className="bg-blue-600 py-2  rounded-full shadow-lg border-2 border-blue-400">
                        <div className="text-white font-bold text-xl tracking-wider text-center">
                          PROADS.SHOP
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-red-100/10">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-red-100/10">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
