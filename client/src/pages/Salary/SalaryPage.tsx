import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import { CustomSidebar } from "../../components/CustomSidebar";
import { Button } from "flowbite-react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./SalaryPage.module.css";
import AddSalaryModal from "../../components/Modal/AddSalaryModal";
import { FaTrashCan } from "react-icons/fa6";

interface Staff {
  _id: string;
  name: string;
  role: string;
}

interface Salary {
  _id: string;
  staffId: Staff;
  amount: number;
  date: string;
  status: string;
}

const SalaryPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSalaryId, setEditSalaryId] = useState<string | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [salaryList, setSalaryList] = useState<Salary[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchStaffList();
    fetchSalaryList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const res = await axiosInstance.get<Staff[]>("/api/staff", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStaffList(res.data);
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  const fetchSalaryList = async () => {
    try {
      const res = await axiosInstance.get<Salary[]>("/api/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSalaryList(res.data);
    } catch (error: any) {
      console.error("Error fetching salary list:", error || error.message);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
    setIsEditModalOpen(false);
    setEditSalaryId(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSalary = async (staffId: string, amount: number) => {
    try {
      const date = new Date();
      const res = await axiosInstance.post<Salary>(
        "/api/payments",
        { staffId, amount, date, status: "paid" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newSalary = res.data;
      setSalaryList((prevSalaryList) => [...prevSalaryList, newSalary]);
      alert("Salary added successfully");
      handleCloseAddModal();
    } catch (error: any) {
      console.error("Error adding salary:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert(`Error adding salary: ${error.response.data.message}`);
      } else {
        alert("Error adding salary");
      }
    }
  };

  const handleOpenEditModal = (salaryId: string) => {
    const salaryToEdit = salaryList.find((salary) => salary._id === salaryId);
    if (salaryToEdit) {
      setEditSalaryId(salaryId);
      setIsAddModalOpen(true);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSalary = async (salaryId: string, amount: number) => {
    try {
      const res = await axiosInstance.put<Salary>(
        `/api/payments/${salaryId}`,
        { amount },
        { headers: { Authorization: `Bearer ${token} ` } }
      );
      setSalaryList((prevSalaryList) =>
        prevSalaryList.map((salary) =>
          salary._id === salaryId
            ? { ...salary, amount: res.data.amount }
            : salary
        )
      );
      alert("Salary updated successfully");
      handleCloseAddModal();
    } catch (error) {
      alert("Error updating salary");
      console.error(error);
    }
  };

  const handleDeleteSalary = async (salaryId: string) => {
    try {
      await axiosInstance.delete(`/api/payments/${salaryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalaryList((prevSalaryList) =>
        prevSalaryList.filter((salary) => salary._id !== salaryId)
      );
      alert("Salary deleted successfully");
    } catch (error) {}
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
            Add Salary
          </Button>
        </div>
        <AddSalaryModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onAddSalary={handleAddSalary}
          staffList={staffList}
        />
        <div className={styles.salaryTable}>
          <h2 className={styles.tableTitle}>Salary List</h2>
          <table>
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>Amount</th>
                <th>Date Paid</th>
                <th data-label="Actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaryList.map((salary) => (
                <tr key={salary._id}>
                  <td>{salary.staffId?.name || "Unknown Staff"}</td>
                  <td>{salary.amount}</td>
                  <td>{new Date(salary.date).toLocaleDateString()}</td>
                  <td>
                    <Button
                      gradientMonochrome="failure"
                      onClick={() => handleDeleteSalary(salary._id)}
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

export default SalaryPage;
