import React, { useEffect, useState } from "react";
import AddStaffModal from "../../components/Modal/AddStaffModal";
import EditStaffModal from "../../components/Modal/EditStaffModal";
import styles from "./StaffPage.module.css";
import { CustomSidebar } from "../../components/CustomSidebar";
import { Button } from "flowbite-react";
import { axiosInstance } from "../../api/axiosConfig";
import { useAuth } from "../../contexts/AuthContext";
import { FaTrashCan } from "react-icons/fa6";
import { TbUserEdit } from "react-icons/tb";

interface Staff {
  _id: string;
  name: string;
  role: string;
  salary: number;
}

const StaffPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const res = await axiosInstance.get<Staff[]>(
        "http://localhost:5000/api/staff",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStaffList(res.data);
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (staff: Staff) => {
    setCurrentStaff(staff);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddStaff = async (formData: Omit<Staff, "_id">) => {
    try {
      const res = await axiosInstance.post<Staff>(
        "http://localhost:5000/api/staff",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newStaffMember = res.data;
      setStaffList((prevStaffList) => [...prevStaffList, newStaffMember]);
      alert("Staff member added successfully");
      handleCloseAddModal();
    } catch (error) {
      alert("Error adding staff member");
      console.error(error);
    }
  };

  const handleUpdateStaff = async (updatedStaff: Staff) => {
    try {
      const res = await axiosInstance.put<Staff>(
        `http://localhost:5000/api/staff/${updatedStaff._id}`,
        updatedStaff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedStaffMember = res.data;
      setStaffList((prevStaffList) =>
        prevStaffList.map((staff) =>
          staff._id === updatedStaffMember._id ? updatedStaffMember : staff
        )
      );
      alert("Staff member updated successfully");
      handleCloseEditModal();
    } catch (error) {
      alert("Error updating staff member");
      console.error(error);
    }
  };

  const handleDeleteStaff = async (staffId: string) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/api/staff/${staffId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStaffList((prevStaffList) =>
        prevStaffList.filter((staff) => staff._id !== staffId)
      );
      alert("Staff member deleted successfully");
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
            onClick={handleOpenAddModal}
          >
            Add Staff
          </Button>
        </div>
        <AddStaffModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onAddStaff={handleAddStaff}
        />
        {currentStaff && (
          <EditStaffModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            staff={currentStaff}
            onUpdateStaff={handleUpdateStaff}
          />
        )}
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
                <th>Salary per-hour</th>
                <th>Actions</th>
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
                      outline
                      style={{ marginBottom: "5px" }}
                      gradientMonochrome="purple"
                      onClick={() => handleOpenEditModal(staff)}
                    >
                      <TbUserEdit size={20} />
                    </Button>
                    <Button
                      outline
                      gradientMonochrome="failure"
                      onClick={() => handleDeleteStaff(staff._id)}
                    >
                      <FaTrashCan size={20} />
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
