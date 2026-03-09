import { getAllCars } from "@/lib/services/cars_service";
import { getAllAssemblers } from "@/lib/services/employees_service";
import { useEffect, useState } from "react";

export const useDashboardHook = () => {
  // States for employees info-number
  const [assemblers, setAssemblers] = useState(0);

  const [electricians, setElextricians] = useState(0);

  const [cars, setCars] = useState(0);

  // Reach data
  useEffect(() => {
    const fetchData = async () => {
      const [employeeData, carsData] = await Promise.all([
        getAllAssemblers(),
        getAllCars(),
      ]);

      setAssemblers(employeeData.filter((e) => e.job === "assembler").length);
      setElextricians(
        employeeData.filter((e) => e.job === "electrician").length,
      );
      setCars(carsData.length);
    };

    fetchData();
  }, []);

  return {
    assemblers,
    electricians,
    cars,
  };
};
