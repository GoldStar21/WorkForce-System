
import { useEffect, useState } from "react";
import { getAllAssemblers } from "@/lib/services/employees_service";
import { EmployeeType } from "@/app/(site)/employees/page";
import { createEmployee,deleteAssembler,updateEmployee } from "@/lib/services/employees_service";
import { useSharedHook } from "./sharedHook/useSharedHook";
import toast from "react-hot-toast";

// TIP PODATAKA KOJE KORISTI FORMA (ONO ŠTO KORISNIK UNOSI)
export type EmployeeForm = {
  name: string;
  surname: string;
  email: string;
  languages: string[];
  job: string;
};

// HOOK
export const useEmployeeHook = (
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>) => {

  

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

  // 4. Event handler for form controll - radio button
  const radiobuttonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((formState) => ({ ...formState, job: e.target.value }));
  };

  // Form reset function
  const formReset = () => {
    setForm({ name: "", surname: "", email: "", languages: [], job: "" });
  };

  // 5. Submit form (if car is selected for edit, use form as edit form else use it as regular form)

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);

  const submitForm = async () => {
    try {
      if (selectedEmployee) {
        const empUpdate = await updateEmployee(selectedEmployee.id, form);

        setEmployees((prev) =>
          prev.map((emp) => (emp.id === selectedEmployee.id ? empUpdate : emp)),
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
    if (!selectedEmployee) return;

    setForm({
      name: selectedEmployee.name,
      surname: selectedEmployee.surname,
      email: selectedEmployee.email,
      languages: selectedEmployee.languages,
      job: selectedEmployee.job,
    });
  }, [selectedEmployee]);

  // 7. Populate Table
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

  // ------------------------------------------------------------------------
  // Variable for languages
  const LANGUAGE_OPTIONS = ["English", "German", "None"];

  const [listOpen, setListOpen] = useState(false);

  const checkboxControl = (selectedLanguage: string) => {
    setForm((formState) => {
      let updatedLanguages: string[] = [];

      if (selectedLanguage === "None") {
        updatedLanguages = ["None"];
      } else {
        updatedLanguages = formState.languages.includes(selectedLanguage)
          ? formState.languages.filter((l) => l !== selectedLanguage)
          : [
              ...formState.languages.filter((l) => l !== "None"),
              selectedLanguage,
            ];
      }

      return {
        ...formState,
        languages: updatedLanguages,
      };
    });
  };

  // DELETE HOOK insert
  const {
    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,
  } = useSharedHook(deleteAssembler, setEmployees);

  const cancelEdit = () => {
    setSelectedEmployee(null);
    formReset();
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

    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,
    cancelEdit,
    setSelectedEmployee,
  };
};
