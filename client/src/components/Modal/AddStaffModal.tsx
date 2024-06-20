import React, { useState } from "react";
import styles from "./AddStaffModal.module.css";
import { Button } from "flowbite-react";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStaff: (formData: Omit<Staff, "_id">) => void;
}

interface Staff {
  _id?: string;
  name: string;
  role: string;
  salary: number;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStaff(formData);
    onClose();
    setFormData(initialFormData);
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
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            required
          />
          <div className={styles.modalActions}>
            <Button
              style={{ fontWeight: "600" }}
              type="submit"
              gradientMonochrome="success"
            >
              Add Staff
            </Button>
            <Button
              style={{ fontWeight: "600" }}
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
