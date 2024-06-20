import React, { useState, useEffect } from "react";
import { Modal, Button, Select, Label, TextInput } from "flowbite-react";
import styles from "./AddSalaryModal.module.css";

interface Staff {
  _id: string;
  name: string;
  role: string;
}

interface SalaryProps {
  _id?: string;
  staffId: string;
  amount: number;
}

interface AddSalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSalary: (staffId: string, amount: number) => void;
  onEditSalary?: (amount: number) => void;
  staffList: Staff[];
  initialSalary?: SalaryProps;
}

const AddSalaryModal: React.FC<AddSalaryModalProps> = ({
  isOpen,
  onClose,
  onAddSalary,
  onEditSalary,
  staffList,
  initialSalary,
}) => {
  const [selectedStaff, setSelectedStaff] = useState<string>(
    initialSalary ? initialSalary.staffId : ""
  );
  const [amount, setAmount] = useState<number>(
    initialSalary ? initialSalary.amount : 0
  );

  useEffect(() => {
    if (initialSalary) {
      setSelectedStaff(initialSalary.staffId);
      setAmount(initialSalary.amount);
    }
  }, [initialSalary]);

  const handleAddOrEditSalary = () => {
    if (onEditSalary) {
      onEditSalary(amount);
    } else {
      onAddSalary(selectedStaff, amount);
    }
    setSelectedStaff("");
    setAmount(0);
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{onEditSalary ? "Edit Salary" : "Add Salary"}</Modal.Header>
      <Modal.Body>
        {!onEditSalary && (
          <div className={styles.formGroup}>
            <Label htmlFor="staff" value="Select Staff Member" />
            <Select
              id="staff"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">Select a staff member</option>
              {staffList.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.name}
                </option>
              ))}
            </Select>
          </div>
        )}
        <div className={styles.formGroup}>
          <Label htmlFor="amount" value="Total Amount" />
          <TextInput
            id="amount"
            type="number"
            placeholder="Total"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button gradientMonochrome="success" onClick={handleAddOrEditSalary}>
          {onEditSalary ? "Update Salary" : "Add Salary"}
        </Button>
        <Button gradientMonochrome="failure" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSalaryModal;
