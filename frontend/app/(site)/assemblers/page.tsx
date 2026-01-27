"use client"

import EmployeesForm from "@/components/(admin_dashboard components)/EmployeesForm";
import EmployeesTable from "@/components/(admin_dashboard components)/EmployeesTable";
import { useState, useEffect } from "react";
import { getAllAssemblers } from "@/lib/approved";

const Assemblers = () => {

  type EmployeeType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  languages: string[];
  job: string;
};

  // State for instant update in table when new employee is saved
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAssemblers();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="assemblers">
      
      <EmployeesForm employees={employees} setEmployees={setEmployees} />
      <EmployeesTable employees={employees} setEmployees={setEmployees} />

    </div>
  );
};

export default Assemblers;
