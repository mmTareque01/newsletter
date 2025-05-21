import { ReactNode } from "react";
import {  FaRegUser } from "react-icons/fa";
import { FiPieChart } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { LuLayoutDashboard, LuPlug } from "react-icons/lu";
import { TbCubePlus, TbUsers } from "react-icons/tb";

export type NavItem = {
  name: string;
  icon: ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const root = "/dashboard";
export const adminNavItems: NavItem[] = [
  {
    icon: <LuLayoutDashboard />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: root, pro: false }],
  },
  // {
  //   icon: <MdOutlineCalendarMonth />, // <CalenderIcon />,
  //   name: "Calendar",
  //   path: root + "/calendar",
  // },
  {
    icon: <IoMailOutline />, // <UserCircleIcon />,
    name: "Campaigns",
    path: root + "/campaigns",
  },
  {
    icon: <TbUsers />, // <UserCircleIcon />,
    name: "Subscribers",
    path: root + "/subscribers",
  },
  {
    icon: <FaRegUser />, // <UserCircleIcon />,
    name: "User Profile",
    path: root + "/profile",
  },
  // {
  //   name: "Forms",
  //   icon: <FaWpforms />, //<GridIcon />,
  //   subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  // },
  // {
  //   name: "Tables",
  //   icon: <LuTableCellsSplit />, // <TableIcon />,
  //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  // },
  // {
  //   name: "Templates",
  //   icon: <LuTableCellsSplit />, // <TableIcon />,
  //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  // },
  // {
  //   name: "Billing",
  //   icon: <LuTableCellsSplit />, // <TableIcon />,
  //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  // },
  // {
  //   name: "Pages",
  //   icon: <FaRegCopy />, // <PageIcon />,
  //   subItems: [
  //     { name: "Blank Page", path: "/blank", pro: false },
  //     { name: "404 Error", path: "/error-404", pro: false },
  //   ],
  // },
];

export const adminOthersItems: NavItem[] = [
  {
    icon: <FiPieChart />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <TbCubePlus />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <LuPlug />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

export const mainNavData = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "Blog",
    path: "/changelog",
  },
  {
    name: "Terms",
    path: "/legal",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
];
