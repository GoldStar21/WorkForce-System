"use client";

import React, { useEffect, useState } from "react";
import { createCar, getAllCars, deleteCar } from "@/lib/api3service";
import CarsForm from "@/components/(admin_dashboard components)/CarsForm";
import CarsTable from "@/components/(admin_dashboard components)/CarsTable";

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

      <CarsForm cars={cars} setCars={setCars} selectedCar={selectedCar}/>
      <CarsTable cars={cars} setCars={setCars} onEdit={setSelectedCar}/>

    </div>
  );
};

export default Cars;
