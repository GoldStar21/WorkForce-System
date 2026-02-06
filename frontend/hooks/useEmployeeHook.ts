// Custom hook (logic + state + bussinness logic) toast fali

import { useEffect, useState } from "react";
import toast from "react-hot-toast";



import {
  createEmployee,
  updateEmployee,
} from "@/lib/services/employees_service";

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

// HOOK
export const useEmployee = (
  employees: EmployeeType[],
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>,
  selectedEmployee: EmployeeType | null,
  setSelectedEmployee: React.Dispatch<
    React.SetStateAction<EmployeeType | null>
  >,
) => {
  // 1. Initial state of form
  const [form, setForm] = useState<EmployeeForm>({
    name: "",
    surname: "",
    email: "",
    languages: [],
    job: "",
  });

  // 2. Event handler for form controll - input fields
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((formState) => ({ ...formState, [name]: value }));
  };
/*
  // 3. Event handler for form controll - checkBox
  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setForm((form) => ({
      ...form,
      languages: checked
        ? [...form.languages, value]
        : form.languages.filter((f) => f !== value),
    }));
  };
  */

  // 4. Event handler for form controll - radio button
  const radiobuttonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((formState) => ({ ...formState, job: e.target.value }));
  };

  // Form reset function
  const formReset = () => {
    setForm({ name: "", surname: "", email: "", languages: [], job: "" });
  };

  // 5. Submit form (if car is selected for edit, use form as edit form else use it as regular form)
  const submitForm = async () => {
    try {
      if (selectedEmployee) {
        const empUpdate = await updateEmployee(selectedEmployee.id, form);

        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === selectedEmployee.id ? selectedEmployee : emp,
          ),
        );
        toast.success("Employee successfully updated!", { duration: 4000 });
      } else {
        const newEmployee = await createEmployee(form);
        toast.success("Assembler successfully created!", { duration: 4000 });

        setEmployees((formState) => [...formState, newEmployee]);
        formReset();
      }

      formReset();
      setSelectedEmployee(null);
    } catch {
      toast.error("Error occured while saving new assembler!", {
        duration: 4000,
      });
    }
  };

  // 6. Populate form by selected row when EDIT button is pressed

  useEffect(() => {
    if(!selectedEmployee) return;

    setForm({
    name: selectedEmployee.name,
    surname: selectedEmployee.surname,
    email: selectedEmployee.email,
    languages: selectedEmployee.languages,
    job: selectedEmployee.job,
    });
  }, [selectedEmployee]);

  // 6. Open/Close Delete dialog

  // Napraviti EDIT i DELETE za Employee

  // PROĐI EDIT REDOM SAM KORAK KO PORAK I BACKEND NAPRAVI


 // ------------------------------------------------------------------------
 // Variable for languages
 const LANGUAGE_OPTIONS = ["English", "German", "None"];

 const [listOpen, setListOpen] = useState(false);


 const checkboxControl = (selectedLanguage: string) => {

  setForm((formState) => {

    let updatedLanguages: string[] = [];

    if(selectedLanguage === "None") { updatedLanguages = ["None"];

    } else { 
      updatedLanguages = formState.languages.includes(selectedLanguage)
      ? formState.languages.filter((l) => l !== selectedLanguage)
      : [...formState.languages.filter((l) => l !== "None"), selectedLanguage];
    }

    return {
      ...formState,
      languages: updatedLanguages,
    };
  });
 };



  return {
    form,
    setForm,
    inputChange,
    radiobuttonChange,
    submitForm,
    checkboxControl,
    listOpen,
    setListOpen,
    LANGUAGE_OPTIONS,
    editMode: !!selectedEmployee,
    formReset,
  };
};
