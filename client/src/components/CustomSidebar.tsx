import React from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import styles from "./CustomSidebar.module.css";
import { FaUserGroup } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { TbLogout } from "react-icons/tb";

export const CustomSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.appName}>Staffify</div>
      <div className={styles.sidebarItems}>
        <ul>
          <li>
            <Link to="/staff" className={styles.sidebarItem}>
              <FaUserGroup style={{ marginRight: "10px" }} />
              Staff
            </Link>
          </li>
          <li>
            <Link to="/salary" className={styles.sidebarItem}>
              <GiReceiveMoney style={{ marginRight: "10px" }} />
              Salary
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.sidebarItem}>
              <TbLogout style={{ marginRight: "10px" }} />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
