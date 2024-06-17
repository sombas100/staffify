import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Button from "react-bootstrap/Button";
import { FaLongArrowAltRight } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Staffify</h1>
        <p className={styles.description}>
          Staffify is a free staff attendance and payroll management application
          that enables employers to easily manage their staff with automatic
          salary calculation, salary payment and more.
        </p>
        <Link to="/login">
          <Button className={styles.btn}>
            Get Started
            <FaLongArrowAltRight
              style={{ paddingLeft: "10px", marginTop: "3px" }}
            />
          </Button>
        </Link>
        <div className={styles.topBlur}></div>
        <div className={styles.bottomBlur}></div>
      </div>
    </div>
  );
};

export default LandingPage;
