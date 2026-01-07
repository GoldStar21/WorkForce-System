"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import {
  createAssembler,
  getAllAssemblers,
  deleteAssembler,
} from "@/lib/approved";
import toast from "react-hot-toast";

const Assemblers = () => {
  type FormData = {
    name: string;
    surname: string;
    email: string;
    languages: string[];
    job: string;
  };

  const [form, setForm] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    languages: [],
    job: "",
  });

  type Employee = {
    id: number;
    name: string;
    surname: string;
    email: string;
    languages: string[];
    job: string;
  };

  const [employees, setEmployees] = useState<Employee[]>([]);

  // 1. Delete function
  const handleDelete = async (id: number): Promise<void> => {
    await deleteAssembler(id);
  };

  // Text inputs handler
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  //CheckBox handler
  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (value === "none") {
      setForm({ ...form, languages: checked ? ["none"] : [] });
    } else {
      let newLanguages = form.languages.filter((l) => l !== "none");

      if (checked) {
        newLanguages.push(value);
      } else {
        newLanguages = newLanguages.filter((l) => l !== value);
      }
      setForm({ ...form, languages: newLanguages });
    }
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, job: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // poziv API-ja za kreiranje novog assemblera
      const response = await createAssembler(form);
      toast.success("Assembler successfully created!", {
        duration: 4000,
      });

      // opcionalno: reset forme
      setForm({
        name: "",
        surname: "",
        email: "",
        job: "",
        languages: [],
      });

      // ili update UI liste assemblera
      // npr. setAssemblers(prev => [...prev, response]);
    } catch (error) {
      toast.error("Error occured while saving new assembler!", {
        duration: 4000,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAssemblers();
        console.log("API response:", data, Array.isArray(data));
        setEmployees(data);
      } catch (error) {
        console.error("Greška pri dohvaćanju zaposlenika:", error);
      }
    };

    fetchData();
  }, []);

  // KLIKOM NA IKONE ONE TRI DA SE OTVARA STA TREBA A DA UKINEM DROPDOWN MENU JER JE SUVISAN

  return (
    
    <div className="assemblers">
      {/* INSERT WORKER IN DATABASe*/}
      <form className="assemblers__form" onSubmit={handleSubmit}>
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
              value="english"
              checked={form.languages.includes("english")}
              onChange={checkboxChange}
            />
            English
          </label>

          <label className="assemblers__checkboxLabel">
            <input
              type="checkbox"
              id="german"
              name="languages"
              value="german"
              checked={form.languages.includes("german")}
              onChange={checkboxChange}
            />
            German
          </label>

          <label className="assemblers__checkboxLabel">
            <input
              type="checkbox"
              id="none"
              name="languages"
              value="none"
              checked={form.languages.includes("none")}
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
              value="assembler"
              checked={form.job === "assembler"}
              onChange={handleJobChange}
            />
            Assembler
          </label>

          <label className="assemblers__radioLabel">
            <input
              type="radio"
              name="job"
              value="electrician"
              checked={form.job === "electrician"}
              onChange={handleJobChange}
            />
            Electrician
          </label>
        </div>

        <Button label="Save" type="submit" modifier="button-login" />
      </form>

      

      {/* TABLE */}
      <div className="assemblers__wrapper">
        <table className="assemblers__table">
          <thead className="assemblers__thead">
            <tr className="assemblers__tr">
              <th className="assemblers__th">ID</th>
              <th className="assemblers__th">NAME</th>
              <th className="assemblers__th">SURNAME</th>
              <th className="assemblers__th">E-MAIL</th>
              <th className="assemblers__th">LANGUAGES</th>
              <th className="assemblers__th">JOB</th>
              <th className="assemblers__th">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="assemblers__tbody">
            {employees.map((employee) => (
              <tr className="assemblers__tr" key={employee.id}>
                <td className="assemblers__td">{employee.id}</td>
                <td className="assemblers__td">{employee.name}</td>
                <td className="assemblers__td">{employee.surname}</td>
                <td className="assemblers__td">{employee.email}</td>
                <td className="assemblers__td">
                  {employee.languages.join(", ")}
                </td>
                <td className="assemblers__td">{employee.job}</td>
                <td className="assemblers__buttons">
                  <Button label="EDIT" modifier="button-edit" />
                  <Button
                    label="DELETE"
                    onClick={() => handleDelete(employee.id)}
                    modifier="actions"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assemblers;
