// Custom hook (logic + state + bussinness logic) toast fali

import { useState } from "react";
import toast from "react-hot-toast";
import { createAssembler } from "@/lib/approved";

// TIP PODATAKA KOJE KORISTI FORMA (ONO ŠTO KORISNIK UNOSI)
type EmployeeForm = {
  name: string;
  surname: string;
  email: string;
  languages: string[];
  job: string;
};

// TIP ZAPOSLENIKA KAKAV POSTOJI U SISTEMU / BAZI
type EmployeeType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  languages: string[];
  job: string;
};

// CUSTOM HOOK ZA LOGIKU FORME
export const useEmployeeForm = (employees: EmployeeType[], setEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>) => {
  
  const [form, setForm] = useState<EmployeeForm>({
    name: "",
    surname: "",
    email: "",
    languages: [],
    job: "",
  });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setForm((prev) => {
      if (value === "None") {
        return { ...prev, languages: checked ? ["None"] : [] };
      }

      let newLanguages = prev.languages.filter((l) => l !== "None");

      if (checked) newLanguages.push(value);
      else newLanguages = newLanguages.filter((l) => l !== value);

      return { ...prev, languages: newLanguages };
    });
  };

  const jobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, job: e.target.value }));
  };

  const submit = async () => {
    try {
      const response = await createAssembler(form);
      toast.success("Assembler successfully created!", { duration: 4000 });

      setEmployees([...employees, response]);
      setForm({ name: "", surname: "", email: "", job: "", languages: [] });
    } catch {
      toast.error("Error occured while saving new assembler!", {
        duration: 4000,
      });
    }
  };

  return {
    form,
    inputChange,
    checkboxChange,
    jobChange,
    submit,
  };
};
