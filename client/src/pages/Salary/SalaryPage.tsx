import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import { CustomSidebar } from "../../components/CustomSidebar";
import { Button, Select, Label, TextInput } from "flowbite-react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./SalaryPage.module.css";
import AddSalaryModal from "../../components/Modal/AddSalaryModal";

interface Staff {
  _id: string;
  name: string;
  role: string;
}

interface Salary {
  _id: string;
  staff: Staff;
  amount: number;
  date: string;
}

const SalaryPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
          Authorization: `Bearer: ${token}`,
        },
      });
      setSalaryList(res.data);
    } catch (error) {
      console.error("Error fetching salary list:", error);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSalary = async (staffId: string, amount: number) => {
    try {
      const res = await axiosInstance.post<Salary>(
        "/api/salary",
        { staffId, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSalaryList((prevSalaryList) => [...prevSalaryList, res.data]);
      alert("Salary added successfully");
      handleCloseAddModal();
    } catch (error) {
      alert("Error adding salary");
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
                <th>Date paid</th>
              </tr>
            </thead>
            <tbody>
              {salaryList.map((salary) => (
                <tr key={salary._id}>
                  <td>{salary.staff.name}</td>
                  <td>{salary.amount}</td>
                  <td>{new Date(salary.date).toLocaleDateString()}</td>
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
