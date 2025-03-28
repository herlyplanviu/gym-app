// src/components/Navbar.tsx
import React from "react";
import { Link } from "@tanstack/react-router";
import {
  HomeIcon,
  ClockIcon,
  CheckBadgeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"; // Import icons
import logo from "../assets/logo.jpeg";

interface NavbarItemProps {
  to: string;
  title?: string;
  icon?: React.ReactNode; // New prop for icon
}

const NavbarItem: React.FC<NavbarItemProps> = ({ to, title, icon }) => (
  <Link
    to={to}
    className={`flex items-center text-blue-600 hover:text-blue-800 transition duration-200 [&.active]:text-green-500 [&.active]:font-bold`}
  >
    {icon && <span className="mr-2">{icon}</span>}{" "}
    {/* Render icon if provided */}
    {title}
  </Link>
);

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
      <ul className="flex space-x-6">
        <li>
          <NavbarItem
            to="/"
            title="Dashboard"
            icon={<HomeIcon className="h-5 w-5" />}
          />
        </li>
        <li>
          <NavbarItem
            to="/member"
            title="Member"
            icon={<UserGroupIcon className="h-5 w-5" />}
          />
        </li>
        <li>
          <NavbarItem
            to="/attendance"
            title="Attendance"
            icon={<ClockIcon className="h-5 w-5" />}
          />
        </li>
        <li>
          <NavbarItem
            to="/membership"
            title="Gym Membership"
            icon={<CheckBadgeIcon className="h-5 w-5" />}
          />
        </li>
      </ul>
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12" />
      </div>
    </nav>
  );
};

export default Navbar;
