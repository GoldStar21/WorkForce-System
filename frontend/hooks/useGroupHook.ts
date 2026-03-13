import { Car, Employee } from "@/app/(site)/groups/page";
import { getAllCars } from "@/lib/services/cars_service";
import { getAllAssemblers } from "@/lib/services/employees_service";
import {
  createNewGroup,
  getGropList,
  updateGroup,
  deleteGroup,
} from "@/lib/services/group_service";
import { useEffect, useRef, useState } from "react";
import { GroupType } from "@/app/(site)/groups/page";
import { getAllGroups } from "@/lib/services/group_service";
import toast from "react-hot-toast";
import { useSharedHook } from "./sharedHook/useSharedHook";

export type GroupFormState = {
  employeesId: number[];
  carId: number | null;
  name: string;
  country: string;
  adress: string;
  dateFrom: string;
  dateTo: string;
};

export const useGroupHook = (
  groups: GroupType[],
  setGroups: React.Dispatch<React.SetStateAction<GroupType[]>>,
) => {
  // 1. Form state
  const [form, setFrom] = useState<GroupFormState>({
    name: "",
    country: "",
    adress: "",
    dateFrom: "",
    dateTo: "",
    employeesId: [],
    carId: null,
  });

  // 2. Event handler for form controll - input fields
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFrom((formState) => ({ ...formState, [name]: value }));
  };

  // State for open/close dropdown menu in group form
  const [openEmpList, setOpenEmpList] = useState(false);
  const [openCarList, setOpenCarList] = useState(false);

  // 3. Event handler for form controll - dropdown
  const dropdownChange = (type: "employee" | "car", id: number) => {
    setFrom((formState) => {
      if (type === "employee") {
        const checkAllready = formState.employeesId.includes(id);

        return {
          ...formState,
          employeesId: checkAllready
            ? formState.employeesId.filter((f) => f !== id)
            : [...formState.employeesId, id],
        };
      }

      if (type === "car") {
        return {
          ...formState,
          carId: formState.carId === id ? null : id,
        };
      }
      return formState;
    });
  };

  // 4. State for employees and useEffect for data
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empData = await getAllAssemblers();
        const carData = await getAllCars();
        setEmployees(empData);
        setCars(carData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  // State for selected group
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);

  // 5. Submit form (if car is selected for edit, use form as edit form else use it as regular form)
  const submitForm = async () => {
    try {
      if (selectedGroup) {
        const groupUpdate = await updateGroup(selectedGroup.id, form);

        setGroups((prev) =>
          prev.map((gr) => (gr.id === selectedGroup.id ? groupUpdate : gr)),
        );
        toast.success("Employee successfully updated!", { duration: 4000 });
        setSelectedGroup(null); // ← dodaj
        formReset();
      } else {
        const newgroup = await createNewGroup(form);
        toast.success("Group successfully created!", { duration: 4000 });
        setGroups((prev) => [...prev, newgroup]);

        setFrom({
          name: "",
          country: "",
          adress: "",
          dateFrom: "",
          dateTo: "",
          employeesId: [],
          carId: null,
        });
      }
    } catch {
      toast.error("Error occured while saving new assembler!", {
        duration: 4000,
      });
    }
  };

  // 8. Populate form

  const editGroup = (group: GroupType) => {
    setSelectedGroup(group);
    setFrom({
      name: group.name,
      country: group.country,
      adress: group.adress,
      dateFrom: group.dateFrom,
      dateTo: group.dateTo,
      employeesId: group.employeesId, // ← uzmi iz grupe
      carId: group.carId,
    });
  };

  // 6. GET GEOUPS FOR GROUPS TABLE

  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const data = await getAllGroups();
        setGroups(data);
      } catch (error) {
        console.error("Error while fetching groups:", error);
      }
    };

    fetchGroupsData();
  }, []);

  // 7. Window for employee list
  const [isEmployeeListOpen, setIsEmployeeListOpen] = useState(false);
  const [employeesOfTheGroup, setEmployeesOfTheGroup] = useState<Employee[]>(
    [],
  );

  const openEmployeeGroupList = (groupId: number) => {
    setIsEmployeeListOpen(true);
    fetchDataForEmployees(groupId);
  };

  const closeEmployeeGroupList = () => {
    setIsEmployeeListOpen(false);
  };

  const fetchDataForEmployees = async (groupId: number) => {
    try {
      const data = await getGropList(groupId);
      setEmployeesOfTheGroup(data);
    } catch (error: any) {
      console.error("Error fetching employees:", error);
    }
  };

  // DELETE HOOK insert
  const {
    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,
  } = useSharedHook(deleteGroup, setGroups);

  // Funkcija za resetiranje forme
  const formReset = () => {
    setFrom({
      name: "",
      country: "",
      adress: "",
      dateFrom: "",
      dateTo: "",
      employeesId: [],
      carId: null,
    });
  };

  const cancelEdit = () => {
    setSelectedGroup(null);
    formReset();
  };

  return {
    form,
    setFrom,
    openEmpList,
    setOpenEmpList,
    openCarList,
    setOpenCarList,
    inputChange,
    dropdownChange,
    employees,
    setEmployees,
    cars,
    setCars,
    submitForm,

    groups,
    setGroups,

    isEmployeeListOpen,
    setIsEmployeeListOpen,
    employeesOfTheGroup,
    setEmployeesOfTheGroup,
    openEmployeeGroupList,
    closeEmployeeGroupList,
    editGroup,
    editMode: !!selectedGroup,

    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,

    cancelEdit,

    //refForDropdown,
  };
};
