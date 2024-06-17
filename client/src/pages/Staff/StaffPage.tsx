import React, { useState } from "react";
import AddStaffModal from "../../components/Modal/AddStaffModal";
import styles from "./StaffPage.module.css";
import { CustomSidebar } from "../../components/CustomSidebar";
import { Button } from "flowbite-react";

const StaffPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <CustomSidebar />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 style={{ fontWeight: "600", fontSize: "34px" }}>Your Staff</h1>
          <Button
            gradientMonochrome="info"
            className={styles.addButton}
            onClick={handleOpenModal}
          >
            Add Staff
          </Button>
        </div>
        <AddStaffModal isOpen={isModalOpen} onClose={handleCloseModal} />
        {/* Add any additional staff content here */}
      </div>
    </div>
  );
};

export default StaffPage;
