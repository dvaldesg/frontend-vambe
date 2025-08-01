import {
  Users,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Upload,
  Calendar,
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
        title: "Salesmen",
        url: "/dashboard/salesmen",
        icon: Banknote,
      },
      {
        title: "Meetings",
        url: "/dashboard/meetings",
        icon: Calendar,
        isNew: true,
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
          { title: "Upload a Meetings CSV", url: "/clients/upload-csv", icon: Upload },
        ],
      },
    ],
  },
];
