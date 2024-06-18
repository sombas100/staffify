import React, { useEffect, useState } from "react";
import AddStaffModal from "../../components/Modal/AddStaffModal";
import styles from "./StaffPage.module.css";
import { CustomSidebar } from "../../components/CustomSidebar";
import { Button } from "flowbite-react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { axiosInstance } from "../../api/axiosConfig";

interface Staff {
  _id: string;
  name: string;
  role: string;
  salary: number;
}

const StaffPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStaffList();
    console.log(token);
  }, [token]);

  const fetchStaffList = async () => {
    try {
      const res = await axiosInstance.get<Staff[]>("/api/staff");
      setStaffList(res.data);
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddStaff = async (formData: Staff) => {
    try {
      const res = await axiosInstance.post<Staff>("/api/staff", formData);
      const newStaffMember = res.data;
      setStaffList((prevStaffList) => [...prevStaffList, newStaffMember]);
      alert("Staff member added successfully");

      handleCloseModal();
    } catch (error) {
      alert("Error adding staff member");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <CustomSidebar />
      <div className={styles.content}>
        <div className={styles.header}>
          <div></div>
          <Button
            style={{ fontWeight: "600" }}
            gradientMonochrome="cyan"
            outline
            className={styles.addButton}
            onClick={handleOpenModal}
          >
            Add Staff
          </Button>
        </div>
        <AddStaffModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddStaff={handleAddStaff}
        />
        <div className={styles.staffTable}>
          <h2
            style={{
              fontWeight: "600",
              fontSize: "32px",
              marginBottom: "16px",
            }}
          >
            Staff List
          </h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>£ Salary per-hour</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id}>
                  <td>{staff.name}</td>
                  <td>{staff.role}</td>
                  <td>{staff.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
