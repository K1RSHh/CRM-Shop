import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react"; // або framer-motion
import {
  HouseLineIcon,
  PackageIcon,
  ReceiptIcon,
  UsersThree,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Overview",
      path: "/dashboard",
      icon: <HouseLineIcon size={28} weight="bold" />,
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: <PackageIcon size={28} weight="bold" />,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: <ReceiptIcon size={28} weight="bold" />,
    },
    {
      title: "Customers",
      path: "/customers",
      icon: <UsersThree size={28} weight="bold" />,
    },
  ];

  const SidebarItem = ({
    icon,
    label,
    isCollapsed,
    link,
  }: {
    icon: any;
    label: string;
    isCollapsed: boolean;
    link: string;
  }) => (
    <NavLink to={link}>
      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-background/50 cursor-pointer text-white hover:text-primary transition-all">
        <div className="min-w-6">{icon}</div>

        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="whitespace-nowrap font-medium"
          >
            {label}
          </motion.span>
        )}
      </div>
    </NavLink>
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="relative flex flex-col h-screen bg-orange-100/20 border-r border-sand shadow-sm"
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-primary text-white rounded-full p-1 border border-white shadow-md hover:bg-accent transition-colors"
      >
        {isCollapsed ? <CaretRight size={16} /> : <CaretLeft size={16} />}
      </button>

      <div className="flex flex-col gap-2 p-4 mt-16">
        {menuItems.map((items) => (
          <SidebarItem
            icon={items.icon}
            label={items.title}
            isCollapsed={isCollapsed}
            link={items.path}
          ></SidebarItem>
        ))}
      </div>
    </motion.aside>
  );
}

export default Sidebar;
