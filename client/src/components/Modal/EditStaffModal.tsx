import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import styles from "./EditStaffModal.module.css";

interface Staff {
  _id: string;
  name: string;
  role: string;
  salary: number;
}

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff;
  onUpdateStaff: (FormData: Staff) => void;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({
  isOpen,
  onClose,
  staff,
  onUpdateStaff,
}) => {
  const [formData, setFormData] = useState<Staff>(staff);

  useEffect(() => {
    setFormData(staff);
  }, [staff]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStaff(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Edit Staff</h2>
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
            <Button type="submit" gradientMonochrome="purple">
              Update Staff
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

export default EditStaffModal;
