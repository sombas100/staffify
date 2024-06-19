import React, { useState } from "react";
import { Modal, Button, Select, Label, TextInput } from "flowbite-react";
import styles from "./AddSalaryModal.module.css";

interface Staff {
  _id: string;
  name: string;
  role: string;
}

interface AddSalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSalary: (staffId: string, amount: number) => void;
  staffList: Staff[];
}

const AddSalaryModal: React.FC<AddSalaryModalProps> = ({
  isOpen,
  onClose,
  onAddSalary,
  staffList,
}) => {
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleAddSalary = () => {
    onAddSalary(selectedStaff, amount);
    setSelectedStaff("");
    setAmount(0);
  };
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Add Salary</Modal.Header>
      <Modal.Body>
        <div className={styles.formGroup}>
          <Label htmlFor="staff" value="Select Staff Member" />
          <Select
            id="staff"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
          >
            <option>Select a staff member</option>
            {staffList.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </Select>
        </div>
        <div className={styles.formGroup}>
          <Label htmlFor="amount" value="Salary Amount" />
          <TextInput
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button gradientMonochrome="success" onClick={handleAddSalary}>
          Add Salary
        </Button>
        <Button gradientMonochrome="failure" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSalaryModal;
