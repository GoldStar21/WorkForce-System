"use client";

import { useState } from "react";
import CarsForm from "@/components/(admin_dashboard components)/CarsForm";
import CarsTable from "@/components/(admin_dashboard components)/CarsTable";
import { useCarHook } from "@/hooks/useCarHook";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Button from "@/components/Button";

const Cars = () => {
  type CarsType = {
    id: number;
    make: string;
    model: string;
    year: string;
    tuv: string;
    plates: string;
    fuel: string;
  };

  // State for instant update in table when new employee is saved
  const [cars, setCars] = useState<CarsType[]>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    form,
    inputControll,
    radioButtonControll,
    submitForm,
    editMode,
    cancelEdit,
    setSelectedCar,
    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,
  } = useCarHook(setCars);

  return (
    <div className="cars">

      <Button
        label=" + Add employee"
        modifier="button--addEmployee"
        onClick={() => setIsFormOpen(true)}
      />

      <div className={`cars__formModal ${isFormOpen ? "cars__formModal--open" : ""}`}>
      <CarsForm
        form={form}
        inputControll={inputControll}
        radioButtonControll={radioButtonControll}
        submitForm={submitForm}
        editMode={editMode}
        cancelEdit={cancelEdit}
        onClose={() => setIsFormOpen(false)}
      />
      </div>
      <CarsTable
        cars={cars}
        onEdit={setSelectedCar}
        onDelete={openDeleteDialog}
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

export default Cars;
