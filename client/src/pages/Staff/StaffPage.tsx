import React, { useEffect, useState } from "react";
import AddStaffModal from "../../components/Modal/AddStaffModal";
import styles from "./StaffPage.module.css";
import { CustomSidebar } from "../../components/CustomSidebar";
import { Button } from "flowbite-react";
import { axiosInstance } from "../../api/axiosConfig";
import { useAuth } from "../../contexts/AuthContext";
import { FaTrashCan } from "react-icons/fa6";

interface Staff {
  _id: string;
  name: string;
  role: string;
  salary: number;
}

const StaffPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state
  const { token } = useAuth();

  useEffect(() => {
    fetchStaffList();
    console.log(token);
  }, [token]); // Ensure this effect runs only when the token changes

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

  const handleAddStaff = async (formData: Omit<Staff, "_id">) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post<Staff>("/api/staff", formData);
      const newStaffMember = res.data;
      setStaffList((prevStaffList) => [...prevStaffList, newStaffMember]);
      alert("Staff member added successfully");
      handleCloseModal();
    } catch (error) {
      alert("Error adding staff member");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStaff = async (staffId: string) => {
    try {
      await axiosInstance.delete(`/api/staff/${staffId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStaffList((prevStaffList) =>
        prevStaffList.filter((staff) => staff._id !== staffId)
      );
      alert("Staff deleted successfully");
    } catch (error) {
      alert("Error deleting staff member");
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
                <th>Salary per hour</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id}>
                  <td>{staff.name}</td>
                  <td>{staff.role}</td>
                  <td>{staff.salary}</td>
                  <td>
                    <Button
                      gradientMonochrome="failure"
                      onClick={() => handleDeleteStaff(staff._id)}
                    >
                      <FaTrashCan />
                    </Button>
                  </td>
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
