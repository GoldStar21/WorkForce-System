"use client"

import EmployeesForm from "@/components/(admin_dashboard components)/EmployeesForm";
import EmployeesTable from "@/components/(admin_dashboard components)/EmployeesTable";
import { useState, useEffect } from "react";
import { getAllAssemblers } from "@/lib/approved";
import { useEmployee } from "@/hooks/useEmployeeHook";

const Assemblers = () => {

  type EmployeeType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  languages: string[];
  job: string;
};

  // State for instant update in the table when new employee is saved
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);


const employeeForm = useEmployee(
  employees,
  setEmployees,
  selectedEmployee,
  setSelectedEmployee,);


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
      
      <EmployeesForm employees={employees} setEmployees={setEmployees} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
      <EmployeesTable employees={employees} setEmployees={setEmployees} onEdit={setSelectedEmployee}/>

    </div>
  );
};

export default Assemblers;
