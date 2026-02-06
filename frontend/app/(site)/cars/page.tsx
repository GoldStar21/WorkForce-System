"use client";

import { useEffect, useState } from "react";
import {getAllCars} from "@/lib/api3service";
import CarsForm from "@/components/(admin_dashboard components)/CarsForm";
import CarsTable from "@/components/(admin_dashboard components)/CarsTable";
import { useCarForm } from "@/hooks/useCarHook";
import ConfirmationDialog from "@/components/ConfirmationDialog";

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

  // State for selected car for edit purposes
  const [selectedCar, setSelectedCar] = useState<CarsType | null>(null);

  // Parent poziva hook
  const carForm = useCarForm(cars, setCars, selectedCar, setSelectedCar);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsData = await getAllCars();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="cars">

      <CarsForm cars={cars} setCars={setCars} selectedCar={selectedCar}  setSelectedCar={setSelectedCar}/>
      <CarsTable cars={cars} setCars={setCars} onEdit={setSelectedCar} onDelete={carForm.openDeleteDialog}/>

       {carForm.isConfirmationDialogOpen && (
        <ConfirmationDialog
          closeDialog={carForm.closeDeleteDialog}
          confirm={carForm.confirmDelete}
        />
      )}

      

    </div>
  );
};

export default Cars;
