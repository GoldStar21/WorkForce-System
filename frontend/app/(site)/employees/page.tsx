"use client";

import EmployeesForm from "@/components/(admin_dashboard components)/EmployeesForm";
import EmployeesTable from "@/components/(admin_dashboard components)/EmployeesTable";
import { useState } from "react";
import { useEmployeeHook } from "@/hooks/useEmployeeHook";
import ConfirmationDialog from "@/components/ConfirmationDialog";

// TIP ZAPOSLENIKA KAKAV POSTOJI U SISTEMU / BAZI
export type EmployeeType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  languages: string[];
  job: string;
};

const Assemblers = () => {
  // State for instant update in the table when new employee is saved
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  const {
    form,
    setForm,
    inputChange,
    radiobuttonChange,
    submitForm,
    checkboxControl,
    listOpen,
    setListOpen,
    LANGUAGE_OPTIONS,
    editMode,
    formReset,
    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,
    cancelEdit,
    setSelectedEmployee,
  } = useEmployeeHook(setEmployees);

  return (
    <div className="assemblers">
      <EmployeesForm
        form={form}
        inputChange={inputChange}
        radiobuttonChange={radiobuttonChange}
        submitForm={submitForm}
        checkboxControl={checkboxControl}
        listOpen={listOpen}
        setListOpen={setListOpen}
        LANGUAGE_OPTIONS={LANGUAGE_OPTIONS}
        editMode={editMode}
        formReset={formReset}
        cancelEdit={cancelEdit}
      />
      <EmployeesTable
        employees={employees}
        openDeleteDialog={openDeleteDialog}
        onEdit={setSelectedEmployee}
      />

      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          closeDialog={closeDeleteDialog}
          confirm={deleteConfirmation}
        />
      )}
    </div>
  );
};

export default Assemblers;
