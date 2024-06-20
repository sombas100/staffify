import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import { CustomSidebar } from "../../components/CustomSidebar";
import { Button } from "flowbite-react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./AttendancePage.module.css";
import AddAttendanceModal from "../../components/Modal/AddAttendanceModal";
import { FaTrashCan } from "react-icons/fa6";

interface Staff {
  _id: string;
  name: string;
  role: string;
}

interface Attendance {
  _id: string;
  staffId: {
    _id: string;
    name: string;
    role: string;
  } | null;
  date: string;
  status: "present" | "absent" | "on leave";
}

const AttendancePage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const { token } = useAuth();
  console.log("Attendance list:", attendanceList);

  useEffect(() => {
    fetchStaffList();
    fetchAttendanceList();
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
      console.error("Error fetching staff list", error);
    }
  };

  const fetchAttendanceList = async () => {
    try {
      const res = await axiosInstance.get<Attendance[]>("/api/attendance", {
        headers: {
          Authorization: `Bearer${token},`,
        },
      });
      setAttendanceList(res.data);
    } catch (error) {
      console.error("Error fetching attendance list", error);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddAttendance = async (
    staffId: string,
    date: Date,
    status: string
  ) => {
    try {
      const res = await axiosInstance.post<Attendance>(
        "/api/attendance",
        { staffId, date, status },
        { headers: { Authorization: `Bearer${token}` } }
      );
      setAttendanceList((prevAttendanceList) => [
        ...prevAttendanceList,
        res.data,
      ]);
      alert("Attendance added successfully");
      handleCloseAddModal();
    } catch (error) {
      alert("Error adding attendance");
      console.error(error);
    }
  };

  const handleDeleteAttendance = async (attendanceId: string) => {
    try {
      await axiosInstance.delete(`/api/attendance/${attendanceId}`, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      setAttendanceList((prevAttendanceList) =>
        prevAttendanceList.filter(
          (attendance) => attendance._id !== attendanceId
        )
      );
      alert("Attendance deleted successfully");
    } catch (error) {
      alert("Error deleting attendance");
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
            Add Attendance
          </Button>
        </div>
        <AddAttendanceModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onAddAttendance={handleAddAttendance}
          staffList={staffList}
        />
        <div className={styles.attendanceTable}>
          <h2 className={styles.tableTitle}>Attendance List</h2>
          <table>
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((attendance) => (
                <tr key={attendance._id}>
                  <td>{attendance.staffId?.name}</td>
                  <td>{new Date(attendance.date).toLocaleDateString()}</td>
                  <td>{attendance.status}</td>
                  <td>
                    <Button
                      size="xs"
                      gradientMonochrome="failure"
                      onClick={() => handleDeleteAttendance(attendance._id)}
                    >
                      {" "}
                      <FaTrashCan size={25} />
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

export default AttendancePage;
