import React, { useState } from "react";
import { Modal, Button, Select, Label, TextInput } from "flowbite-react";
import styles from "./AddAttendanceModal.module.css";

interface Staff {
  _id: string;
  name: string;
}

interface AddAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAttendance: (staffId: string, date: Date, status: string) => void;
  staffList: Staff[];
}

const AddAttendanceModal: React.FC<AddAttendanceModalProps> = ({
  isOpen,
  onClose,
  onAddAttendance,
  staffList,
}) => {
  if (!isOpen) return null;

  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<string>("present");

  const handleAddAttendance = () => {
    onAddAttendance(selectedStaff, new Date(date), status);
    setSelectedStaff("");
    setDate("");
    setStatus("present");
  };
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Add Attendance</Modal.Header>
      <Modal.Body>
        <div className={styles.formGroup}>
          <Label htmlFor="staff" value="Select Staff Member" />
          <Select
            id="staff"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
          >
            <option>Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </Select>
        </div>
        <div className={styles.formGroup}>
          <Label htmlFor="date" value="Select Date" />
          <TextInput
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <Label htmlFor="status" value="Select Status" />
          <Select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="on leave">On Leave</option>
          </Select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddAttendance}>Add Attendance</Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAttendanceModal;
