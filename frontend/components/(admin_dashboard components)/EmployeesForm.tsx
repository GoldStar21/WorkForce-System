"use client";
import Button from "@/components/Button";
import { useEmployeeForm } from "@/hooks/useEmployeeForm";

type EmployeeType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  languages: string[];
  job: string;
};

type EmployeesFormProps = {
  employees: EmployeeType[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>;
};

const EmployeesForm = ({ employees, setEmployees }: EmployeesFormProps) => {
  const { form, inputChange, checkboxChange, jobChange, submit } =
    useEmployeeForm(employees, setEmployees);

  //    const [employeesInTheTable, setEmployeesInTheTable] = useState<EmployeeType[]>([]);

  return (
    <form
      className="assemblersForm"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className="assemblers__container">
        <h2 className="assemblers__formTitle">CREATE NEW EMPLOYEE</h2>
        <label htmlFor="name" className="assemblers__label">
          NAME:
        </label>
        <input
          id="name"
          type="text"
          className="assemblers__input"
          name="name"
          placeholder="Enter name"
          autoComplete="off"
          value={form.name}
          onChange={inputChange}
          required
        />
      </div>

      <div className="assemblers__container">
        <label htmlFor="surname" className="assemblers__label">
          SURNAME:
        </label>
        <input
          id="surname"
          type="text"
          className="assemblers__input"
          name="surname"
          placeholder="Enter surname"
          autoComplete="off"
          value={form.surname}
          onChange={inputChange}
          required
        />
      </div>

      <div className="assemblers__container">
        <label htmlFor="email" className="assemblers__label">
          E-MAIL:
        </label>
        <input
          id="email"
          type="text"
          className="assemblers__input"
          name="email"
          placeholder="Enter email adress"
          autoComplete="off"
          value={form.email}
          onChange={inputChange}
          required
        />
      </div>

      {/* Mogu se izabrati sva checkbox-a ali nikako tri */}
      <div className="assemblers__container">
        <label className="assemblers__label">LANGUAGES:</label>

        <label className="assemblers__checkboxLabel">
          <input
            type="checkbox"
            id="english"
            name="languages"
            value="English"
            checked={form.languages.includes("English")}
            onChange={checkboxChange}
          />
          English
        </label>

        <label className="assemblers__checkboxLabel">
          <input
            type="checkbox"
            id="german"
            name="languages"
            value="German"
            checked={form.languages.includes("German")}
            onChange={checkboxChange}
          />
          German
        </label>

        <label className="assemblers__checkboxLabel">
          <input
            type="checkbox"
            id="none"
            name="languages"
            value="None"
            checked={form.languages.includes("None")}
            onChange={checkboxChange}
          />
          None
        </label>
      </div>

      <div className="assemblers__container">
        <label className="assemblers__label">JOB DESCRIPTION:</label>

        <label className="assemblers__radioLabel">
          <input
            type="radio"
            name="job"
            value="Assembler"
            checked={form.job === "Assembler"}
            onChange={jobChange}
          />
          Assembler
        </label>

        <label className="assemblers__radioLabel">
          <input
            type="radio"
            name="job"
            value="Electrician"
            checked={form.job === "Electrician"}
            onChange={jobChange}
          />
          Electrician
        </label>
      </div>

      <Button label="Save" type="submit" modifier="button--save" />
    </form>
  );
};

export default EmployeesForm;
