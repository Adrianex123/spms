import {
  Home,
  ShoppingCart,
  Package,
  Building,
  LineChart,
  User,
  File,
} from "lucide-react";
export const links = [
  {
    href: "/application",
    icon: Home,
    label: "Dashboard",
  },
  {
    href: "/application/requests",
    icon: ShoppingCart,
    label: "Released Supply",
  },
  {
    href: "/application/stocks",
    icon: Package,
    label: "Supply Proposal",
  },
  {
    href: "/application/departments",
    icon: Building,
    label: "Supplies",
  },
  {
    href: "/application/reports",
    icon: File,
    label: "Reports",
  },
];
