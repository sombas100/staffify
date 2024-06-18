import React, { useState } from "react";
import styles from "./AddStaffModal.module.css";
import axios from "axios";
import { Button } from "flowbite-react";

interface Staff {
  _id: string;
  name: string;
  role: string;
  salary: number;
}

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStaff: (formData: Staff) => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  onAddStaff,
}) => {
  const initialFormData = {
    name: "",
    role: "",
    salary: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/staff", formData);
      const newStaffMember = res.data;
      onAddStaff(newStaffMember);
      alert("Staff member added successfully");
      onClose();
      setFormData(initialFormData);
    } catch (error) {
      alert("Error adding staff member");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Add New Staff</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            required
          />
          <input
            type="number"
            name="salary"
            value={formData.salary.toString()}
            onChange={handleChange}
            placeholder="Salary"
            required
          />
          <div className={styles.modalActions}>
            <Button type="submit" gradientMonochrome="lime">
              Add Staff
            </Button>
            <Button
              type="button"
              gradientMonochrome="failure"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
