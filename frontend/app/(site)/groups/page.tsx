"use client";

import GroupsForm from "@/components/(admin_dashboard components)/GroupsForm";
import GroupTable from "@/components/(admin_dashboard components)/GroupsTable";
import Button from "@/components/Button";
import { useGroupHook } from "@/hooks/useGroupHook";
import { useState } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export type Employee = {
  id: number;
  name: string;
  surname: string;
};

export type Car = {
  id: number;
  make: string;
  model: string;
};

export type GroupType = {
  id: number;
  name: string;
  country: string;
  adress: string;
  dateFrom: string;
  dateTo: string;
  carId: number | null;
  employeesId: number[];
};

const Groups = () => {
  // 3. State for groups - forwarding to table component
  const [groups, setGroups] = useState<GroupType[]>([]);

  const [groupName, setGroupName] = useState<String>("");

  // State for form
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Calling HOOK
  const {
    form,
    inputChange,
    dropdownChange,
    submitForm,
    employees,
    cars,
    openEmpList,
    setOpenEmpList,
    openCarList,
    setOpenCarList,
    isEmployeeListOpen,
    employeesOfTheGroup,
    openEmployeeGroupList,
    closeEmployeeGroupList,
    editGroup,
    editMode,
    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,
    cancelEdit,
    carOfThegroup,
    setCarOfThegroup,

  } = useGroupHook(groups, setGroups);

  return (
    <div className="groups">
      <Button
        label=" + Add employee"
        modifier="button--addEmployee"
        onClick={() => setIsFormOpen(true)}
      />

      <div className={`groups__formModal ${isFormOpen ? "groups__formModal--open" : ""}`}>
        <GroupsForm
          form={form}
          inputChange={inputChange}
          dropdownChange={dropdownChange}
          submitForm={submitForm}
          employees={employees}
          cars={cars}
          openEmpList={openEmpList}
          setOpenEmpList={setOpenEmpList}
          openCarList={openCarList}
          setOpenCarList={setOpenCarList}
          editMode={editMode}
          cancelEdit={cancelEdit}
          onClose={() => setIsFormOpen(false)}
        />
      </div>

      <GroupTable
        groups={groups}
        openEmployeeGroupList={openEmployeeGroupList}
        setGroupName={setGroupName}
        editGroup={editGroup}
        openDeleteDialog={openDeleteDialog}
      />

      {isEmployeeListOpen && (
        <div className="groups__list">
          <div className="groups__nav">
            <h2 className="groups__title">{groupName}</h2>
          </div>

          <div className="groups__emps">
            {employeesOfTheGroup.map((emp) => (
              <ul key={emp.id}>
                <li>
                  {emp.name} {emp.surname}
                </li>
              </ul>
            ))}
          </div>
          <div className="groups__car">
      {carOfThegroup ? (
        <p>{carOfThegroup.make} {carOfThegroup.model}</p>
      ) : (
        <p>Nema zaduženog automobila</p>
      )}
    </div>
          

          <div className="groups__button">
            <Button
              label="CLOSE"
              modifier="button--closeList"
              onClick={closeEmployeeGroupList}
            />
          </div>
        </div>
      )}

      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          closeDialog={closeDeleteDialog}
          confirm={deleteConfirmation}
        />
      )}
    </div>
  );
};

export default Groups;
