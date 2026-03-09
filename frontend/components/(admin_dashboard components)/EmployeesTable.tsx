"use client";

import Button from "@/components/Button";
import { EmployeeType } from "@/app/(site)/employees/page";

type EmployeesTableProps = {
  employees: EmployeeType[];
  onEdit: (employee: EmployeeType) => void;
  openDeleteDialog: (id: number) => void;
};

const EmployeesTable = ({
  employees,
  onEdit,
  openDeleteDialog,
}: EmployeesTableProps) => {
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
            <th className="employeeTable__th"></th>
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
                <Button
                  label="EDIT"
                  modifier="button--edit"
                  onClick={() => onEdit(employee)}
                />
                <Button
                  label="DELETE"
                  onClick={() => openDeleteDialog(employee.id)}
                  modifier="button--delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
