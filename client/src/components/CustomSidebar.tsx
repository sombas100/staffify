import React from "react";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CustomSidebar.module.css";
import { FaUserGroup } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { TbLogout } from "react-icons/tb";
import { MdOutlineWork } from "react-icons/md";

export const CustomSidebar = () => {
  const location = useLocation();
  return (
    <div className={styles.sidebar}>
      <div className={styles.appName}>Staffify</div>
      <div className={styles.sidebarItems}>
        <ul>
          <li className={location.pathname === "/staff" ? styles.active : ""}>
            <Link to="/staff" className={styles.sidebarItem}>
              <FaUserGroup size={25} style={{ marginRight: "10px" }} />
              Staff
            </Link>
          </li>
          <li className={location.pathname === "/salary" ? styles.active : ""}>
            <Link to="/salary" className={styles.sidebarItem}>
              <GiReceiveMoney size={25} style={{ marginRight: "10px" }} />
              Salary
            </Link>
          </li>
          <li
            className={location.pathname === "/attendance" ? styles.active : ""}
          >
            <Link to="/attendance" className={styles.sidebarItem}>
              <MdOutlineWork size={30} style={{ marginRight: "10px" }} />
              Attendance
            </Link>
            <li>
              <Link to="/login" className={styles.sidebarItem}>
                <TbLogout size={25} style={{ marginRight: "10px" }} />
                Logout
              </Link>
            </li>
          </li>
        </ul>
      </div>
    </div>
  );
};
