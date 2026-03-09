"use client";

import Button from "../Button";
import { Employee, Car } from "@/app/(site)/groups/page";
import { FaAnglesDown } from "react-icons/fa6";
import { GroupFormState } from "@/hooks/useGroupHook";

type GroupsFormProps = {
  form: GroupFormState;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dropdownChange: (type: "employee" | "car", id: number) => void;
  submitForm: () => void;
  employees: Employee[];
  cars: Car[];
  openEmpList: boolean;
  setOpenEmpList: React.Dispatch<React.SetStateAction<boolean>>;
  openCarList: boolean;
  setOpenCarList: React.Dispatch<React.SetStateAction<boolean>>;
  editMode: boolean;
};

const GroupsForm = ({
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
  editMode,
}: GroupsFormProps) => {
  return (
    <form
      className="groupForm"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <div className="groupForm__container">
        <h2 className="groupForm__title">{editMode ? "EDIT GROUP" : "CREATE NEW GROUP"}</h2>

        <label htmlFor="" className="groupForm__label">
          SELECT EMPLOYEES
        </label>

        <Button
          label={<FaAnglesDown />}
          type="button"
          modifier="button--drop"
          onClick={() => setOpenEmpList((prev) => !prev)}
        />

        {openEmpList && (
          <ul className="groupForm__dropdown">
            {employees.map((emp) => (
              <li className="groupForm__li" key={emp.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={form.employeesId.includes(emp.id)}
                    onChange={() => dropdownChange("employee", emp.id)}
                  />
                  {emp.name} {emp.surname}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="groupForm__container">
        <label htmlFor="" className="groupForm__label">
          SELECT CAR
        </label>

        <Button
          label={<FaAnglesDown />}
          type="button"
          modifier="button--drop"
          onClick={() => setOpenCarList((prev) => !prev)}
        />

        {openCarList && (
          <ul className="groupForm__dropdown">
            {cars.map((vehicle) => (
              <li className="groupForm__li" key={vehicle.id}>
                <label>
                  <input
                    type="radio"
                    name="car"
                    checked={form.carId === vehicle.id}
                    onChange={() => dropdownChange("car", vehicle.id)}
                  />
                </label>

                {vehicle.make} {vehicle.model}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="groupForm__container">
        <label htmlFor="name" className="groupForm__label">
          PROJECT NAME:
        </label>
        <input
          id="name"
          type="text"
          className="groupForm__input"
          name="name"
          value={form.name}
          onChange={inputChange}
          placeholder="Enter project name"
          autoComplete="off"
          required
        />
      </div>

      <div className="groupForm__container">
        <label htmlFor="country" className="groupForm__label">
          COUNTRY:
        </label>
        <input
          id="country"
          type="text"
          className="groupForm__input"
          name="country"
          value={form.country}
          onChange={inputChange}
          placeholder="Enter country"
          autoComplete="off"
          required
        />
      </div>

      <div className="groupForm__container">
        <label htmlFor="adress" className="groupForm__label">
          ADRESS:
        </label>
        <input
          id="adress"
          type="text"
          className="groupForm__input"
          name="adress"
          value={form.adress}
          onChange={inputChange}
          placeholder="Enter adress"
          autoComplete="off"
          required
        />
      </div>

      <div className="groupForm__container">
        <label htmlFor="datefrom" className="groupForm__label">
          DATE FROM:
        </label>
        <input
          id="dateFrom"
          type="date"
          className="groupForm__input"
          name="dateFrom"
          value={form.dateFrom}
          onChange={inputChange}
          placeholder="Enter date from"
          autoComplete="off"
          required
        />
      </div>

      <div className="groupForm__container">
        <label htmlFor="dateto" className="groupForm__label">
          DATE TO:
        </label>
        <input
          id="dateTo"
          type="date"
          className="groupForm__input"
          name="dateTo"
          value={form.dateTo}
          onChange={inputChange}
          placeholder="Enter date to"
          autoComplete="off"
          required
        />
      </div>
      <Button label={editMode ? "Update" : "Save"} type="submit" modifier="button--save" />
    </form>
  );
};

export default GroupsForm;
