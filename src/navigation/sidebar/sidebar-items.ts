import {
  Users,
  LayoutDashboard,
  ChartBar,
  Banknote,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "General",
        url: "/dashboard/general",
        icon: LayoutDashboard,
      },
      {
        title: "Leads Analysis",
        url: "/dashboard/leads-analysis",
        icon: ChartBar,
      },
      {
        title: "Sellers",
        url: "/dashboard/sellers",
        icon: Banknote,
      },
    ],
  },
  {
    id: 2,
    label: "Pages",
    items: [
      {
        title: "Clients",
        url: "/clients",
        icon: Users,
        subItems: [
          { title: "Meetings", url: "/clients/meetings" },
          { title: "Upload a Meetings CSV", url: "/clients/upload-csv", newTab: true },
        ],
      },
    ],
  },
];
