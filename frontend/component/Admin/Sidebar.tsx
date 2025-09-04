"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTachometerAlt,
  FaChevronDown,
  FaChevronUp,
  FaUserCog,
  FaUserPlus,
  FaList,
  FaUserTie,
  FaUsersCog,
  FaCalendarAlt,
} from "react-icons/fa";
import { useSession } from "next-auth/react";


const Sidebar = () => {
  const {data: session } = useSession()

  const [isOpen, setIsOpen] = useState(true);
  const [isLeaveMenuOpen, setIsLeaveMenuOpen] = useState(false);
  const [isStudentMenuOpen, setIsStudentMenuOpen] = useState(false);
  const [isStaffMenuOpen, setIsStaffMenuOpen] = useState(false);
  const [isHodMenuOpen, setIsHodMenuOpen] = useState(false);
  const [isAdminLeaveMenuOpen, setIsAdminLeaveMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsLeaveMenuOpen(false);
    setIsStudentMenuOpen(false);
    setIsStaffMenuOpen(false);
    setIsHodMenuOpen(false);
    setIsAdminLeaveMenuOpen(false);
  };

  const toggleMenu = (menu: string) => {
    switch (menu) {
      case "student":
        setIsStudentMenuOpen(!isStudentMenuOpen);
        break;
      case "faculty":
        setIsStaffMenuOpen(!isStaffMenuOpen);
        break;
      case "hod":
        setIsHodMenuOpen(!isHodMenuOpen);
        break;
    }
  };

  const SidebarLink = ({
    href,
    icon,
    text,
    isOpen = true,
  }: {
    href: string;
    icon: JSX.Element;
    text: string;
    isOpen?: boolean;
  }) => (
    <Link href={href} className="flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        {icon}
        {isOpen && <span>{text}</span>}
      </div>
    </Link>
  );

  const SidebarMenu = ({
    isOpen,
    isMenuOpen,
    toggleMenu,
    icon,
    label,
    items,
  }: {
    isOpen: boolean;
    isMenuOpen: boolean;
    toggleMenu: () => void;
    icon: JSX.Element;
    label: string;
    items: { href: string; icon: JSX.Element; label: string }[];
  }) => (
    <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={toggleMenu}
      >
        {icon}
        {isOpen && <span>{label}</span>}
        {isOpen &&
          (isMenuOpen ? <FaChevronUp /> : <FaChevronDown />)}
      </div>
      <ul className={`${isOpen && isMenuOpen ? "block" : "hidden"} ml-4 mt-2`}>
        {items.map((item, idx) => (
          <li key={idx} className="mb-2">
            <SidebarLink
              href={item.href}
              icon={item.icon}
              text={item.label}
              isOpen={isOpen}
            />
          </li>
        ))}
      </ul>
    </li>
  );

  const renderMenu = () => {
        return (
          <>
            <SidebarMenu
              isOpen={isOpen}
              isMenuOpen={isStudentMenuOpen}
              toggleMenu={() => toggleMenu("student")}
              icon={<FaUserCog />}
              label="Manage Student"
              items={[
                { href: "/admin/adduser/student", icon: <FaUserPlus />, label: "Add Student" },
                { href: "/admin/viewuser/student", icon: <FaList />, label: "View Student Lists" },
              ]}
            />
            <SidebarMenu
              isOpen={isOpen}
              isMenuOpen={isHodMenuOpen}
              toggleMenu={() => toggleMenu("hod")}
              icon={<FaUserTie />}
              label="Manage Hod"
              items={[
                { href: "/admin/adduser/hod", icon: <FaUserPlus />, label: "Add Hod" },
                { href: "/admin/viewuser/hod", icon: <FaList />, label: "View Hod Lists" },
              ]}
            />
            <SidebarMenu
              isOpen={isOpen}
              isMenuOpen={isStaffMenuOpen}
              toggleMenu={() => toggleMenu("faculty")}
              icon={<FaUsersCog />}
              label="Manage Faculty"
              items={[
                { href: "/admin/adduser/faculty", icon: <FaUserPlus />, label: "Add Faculty" },
                { href: "/admin/viewuser/faculty", icon: <FaList />, label: "View Faculty Lists" },
              ]}
            />
            
            <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
              <SidebarLink href="/admin/leavereport" icon={<FaCalendarAlt />} text="Leave Report" isOpen={isOpen} />
            </li>
          </>
        );
    }
  

  return (
    <div
      className={`bg-gray-600 min-h-[93.2vh] relative text-white ${
        isOpen ? "w-60" : "w-16"
      } transition-width duration-300`}
    >
      <div className="p-4">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <FaBars className={`text-white ${isOpen ? "absolute right-8" : "absolute right-[24px]"}`} />
        </button>
      </div>
      <nav>
        <ul className={`${isOpen ? "" : "flex flex-col justify-center items-center"}`}>
          <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
            <SidebarLink
              href={"/dashboard"}
              icon={<FaTachometerAlt />}
              text="Dashboard"
              isOpen={isOpen}
            />
          </li>
          {renderMenu()}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
