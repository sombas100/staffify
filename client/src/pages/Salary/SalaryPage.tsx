import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import { CustomSidebar } from "../../components/CustomSidebar";
import { Button } from "flowbite-react";
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
  staffId: Staff;
  amount: number;
  date: string;
  status: string;
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
          Authorization: `Bearer ${token}`,
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
      const date = new Date(); // Current date
      const res = await axiosInstance.post<Salary>(
        "/api/payments",
        { staffId, amount, date, status: "paid" }, // Ensure these fields match your Payments model
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newSalary = res.data;
      // Fetch the staff member data to populate the newly added salary
      const staffRes = await axiosInstance.get<Staff>(
        `/api/staff/${newSalary.staffId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      newSalary.staffId = staffRes.data; // Update the staffId field with full staff data
      setSalaryList((prevSalaryList) => [...prevSalaryList, newSalary]);
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
                <th>Date Paid</th>
              </tr>
            </thead>
            <tbody>
              {salaryList.map((salary) => (
                <tr key={salary._id}>
                  <td>{salary.staffId?.name || "Unknown Staff"}</td>
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
