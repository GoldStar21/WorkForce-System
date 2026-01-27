"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { getAllAssemblers, deleteAssembler } from "@/lib/approved";
import toast from "react-hot-toast";
import ConfirmationDialog from "@/components/ConfirmationDialog";


type EmployeeType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  languages: string[];
  job: string;
};

type EmployeesTableProps = {
  employees: EmployeeType[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>;
};


const EmployeesTable = ({ employees, setEmployees }: EmployeesTableProps) => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

  const openDeleteDialog = (id: number) => {
    setEmployeeToDelete(id);
    setConfirmationDialogOpen(true);
  };

  const closeDialog = () => setConfirmationDialogOpen(false);

  const confirmDelete = async () => {
    if (employeeToDelete === null) return;
    try {
      await deleteAssembler(employeeToDelete);
      setEmployees((prev) => prev.filter((e) => e.id !== employeeToDelete));
      toast.success("Assembler deleted!", { duration: 4000 });
    } catch (error) {
      toast.error("Error deleting assembler!", { duration: 4000 });
    } finally {
      setConfirmationDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };
  
{/*
  type Employee = {
    id: number;
    name: string;
    surname: string;
    email: string;
    languages: string[];
    job: string;
  };

  

  // 1. Delete function
  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteAssembler(id);

      setEmployees((previous) =>
        previous.filter((employees) => employees.id !== id)
      );

      toast.success("Assembler successfully deleted!", { duration: 4000 });
    } catch (error) {
      toast.error("Error occured while deleting assembler!", {
        duration: 4000,
      });
    }
  };

  
  // KLIKOM NA IKONE ONE TRI DA SE OTVARA STA TREBA A DA UKINEM DROPDOWN MENU JER JE SUVISAN

  // ----------------------------CONFIRMATION DIALOG-----------------------------------------
 

  // State for dialog
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  // State for employee to delete
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

  // Open dialog
  const openDeleteDialog = (id: number) => {
    setEmployeeToDelete(id);
    setConfirmationDialogOpen(true);
  };

  // Close dialog
  const closeDialog = () => setConfirmationDialogOpen(false);

  // Dialog delete
  const confirmDelete = async () => {
    if (employeeToDelete === null) return;

    try {
      await handleDelete(employeeToDelete);
    } finally {
      setConfirmationDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };*/}
 // ----------------------------------------------------------------------------------------

  return (
    <div className="employeeTable">
      <table className="employeeTable__table">
        <thead className="employeeTable__thead">
          <tr className="employeeTable__tr">
            <th className="employeeTable__th">ID</th>
            <th className="employeeTable__th">NAME</th>
            <th className="employeeTable__th">SURNAME</th>
            <th className="employeeTable__th">E-MAIL</th>
            <th className="employeeTable__th">LANGUAGES</th>
            <th className="employeeTable__th">JOB</th>
            <th className="employeeTable__th">ACTIONS</th>
          </tr>
        </thead>

        <tbody className="employeeTable__tbody">
          {employees.map((employee) => (
            <tr className="employeeTable__tr" key={employee.id}>
              <td className="employeeTable__td">{employee.id}</td>
              <td className="employeeTable__td">{employee.name}</td>
              <td className="employeeTable__td">{employee.surname}</td>
              <td className="employeeTable__td">{employee.email}</td>
              <td className="employeeTable__td">
                {employee.languages.join(", ")}
              </td>
              <td className="employeeTable__td">{employee.job}</td>
              <td className="employeeTable__buttons">
                <Button label="EDIT" modifier="button--edit" />
                <Button
                  label="DELETE"
                  //onClick={() => handleDelete(employee.id)}
                  onClick={() => openDeleteDialog(employee.id)}
                  modifier="button--delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isConfirmationDialogOpen && (
        <ConfirmationDialog closeDialog={closeDialog} confirm={confirmDelete} />
      )}
    </div>
  );
};

export default EmployeesTable;
