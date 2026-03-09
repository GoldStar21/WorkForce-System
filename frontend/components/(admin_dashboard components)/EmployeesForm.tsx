"use client";
import Button from "@/components/Button";
import { EmployeeForm } from "@/hooks/useEmployeeHook";
import React from "react";

type EmployeesFormProps = {
  form: EmployeeForm;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  radiobuttonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitForm: () => void;
  checkboxControl: (lang: string) => void;
  listOpen: boolean;
  setListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  LANGUAGE_OPTIONS: string[];
  editMode: boolean;
  formReset: () => void;
  cancelEdit: () => void;
};

const EmployeesForm = ({
  form,
  inputChange,
  radiobuttonChange,
  submitForm,
  checkboxControl,
  listOpen,
  setListOpen,
  LANGUAGE_OPTIONS,
  editMode,
  formReset,
  cancelEdit,
}: EmployeesFormProps) => {
  return (
    <form
      className="assemblersForm"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <div className="assemblersForm__container">
        <h2 className="assemblersForm__formTitle">
          {editMode ? "UPDATE EMPLOYEE" : "CREATE NEW EMPLOYEE"}
        </h2>
        <label htmlFor="name" className="assemblersForm__label">
          NAME:
        </label>
        <input
          id="name"
          type="text"
          className="assemblersForm__input"
          name="name"
          placeholder="Enter name"
          autoComplete="off"
          value={form.name}
          onChange={inputChange}
          required
        />
      </div>

      <div className="assemblersForm__container">
        <label htmlFor="surname" className="assemblersForm__label">
          SURNAME:
        </label>
        <input
          id="surname"
          type="text"
          className="assemblersForm__input"
          name="surname"
          placeholder="Enter surname"
          autoComplete="off"
          value={form.surname}
          onChange={inputChange}
          required
        />
      </div>

      <div className="assemblersForm__container">
        <label htmlFor="email" className="assemblersForm__label">
          E-MAIL:
        </label>
        <input
          id="email"
          type="text"
          className="assemblersForm__input"
          name="email"
          placeholder="Enter email adress"
          autoComplete="off"
          value={form.email}
          onChange={inputChange}
          required
        />
      </div>

      {/* MULTI SELECT LANGUAGES */}
      <div className="assemblersForm__container">
        <label className="assemblersForm__label">LANGUAGES:</label>

        <div
          className="assemblersForm__input"
          onClick={() => setListOpen((prev) => !prev)}
        >
          {form.languages.length > 0
            ? form.languages.join(", ")
            : "Select languages"}
        </div>

        {listOpen && (
          <ul className="assemblersForm__list">
            {LANGUAGE_OPTIONS.map((lang) => (
              <li key={lang} className="assemblersForm__listItem">
                <label>
                  <input
                    type="checkbox"
                    checked={form.languages.includes(lang)}
                    onChange={() => checkboxControl(lang)}
                  />
                  {lang}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="assemblersForm__container">
        <label className="assemblersForm__label">JOB DESCRIPTION:</label>

        <label className="assemblersForm__radioLabel">
          <input
            type="radio"
            name="job"
            value="assembler"
            checked={form.job === "assembler"}
            onChange={radiobuttonChange}
          />
          Assembler
        </label>

        <label className="assemblersForm__radioLabel">
          <input
            type="radio"
            name="job"
            value="electrician"
            checked={form.job === "electrician"}
            onChange={radiobuttonChange}
          />
          Electrician
        </label>
      </div>

      <Button label="Save" type="submit" modifier="button--save" />
      {editMode && (
        <Button
          label="Cancel"
          type="button"
          modifier="button--cancel"
          onClick={() => {
            formReset();
          }}
        />
      )}
    </form>
  );
};

export default EmployeesForm;
