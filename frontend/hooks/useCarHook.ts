import { createCar, carUpdate, deleteCar } from "@/lib/services/cars_service";
import { useEffect, useState } from "react";
import { useSharedHook } from "./sharedHook/useSharedHook";
import { getAllCars } from "@/lib/services/cars_service";
import toast from "react-hot-toast";

export type CarForm = {
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
};

export type CarsType = {
  id: number;
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
};

// Hook for CarForm
export const useCarHook = (
  setCars: React.Dispatch<React.SetStateAction<CarsType[]>>,
) => {
  // 1. Initial state of form
  const [form, setForm] = useState<CarForm>({
    make: "",
    model: "",
    year: " ",
    tuv: " ",
    plates: " ",
    fuel: " ",
  });

  // 2. Form controll - controlling input of form and making input for plates to be upper case
  const inputControll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "plates" ? value.toUpperCase() : value,
    }));
  };

  // 3. Radio button controll
  const radioButtonControll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((buttonChoice) => ({ ...buttonChoice, fuel: e.target.value }));
  };

  // Funkcija za resetiranje forme
  const formReset = () => {
    setForm({ make: "", model: "", year: "", tuv: "", plates: "", fuel: "" });
  };

  // State for selected car for edit purposes
  const [selectedCar, setSelectedCar] = useState<CarsType | null>(null);

  // 4. Submit form (if car is selected for edit, use form as edit form else use it as regular form)
  const submitForm = async () => {
    try {
      if (selectedCar) {
        // EDIT
        const updatedCar = await carUpdate(selectedCar.id, form);

        setCars((prev) =>
          prev.map((car) => (car.id === selectedCar.id ? updatedCar : car)),
        );

        toast.success("Vehicle successfully updated!");
      } else {
        // CREATE
        const newCar = await createCar(form);

        setCars((prev) => [...prev, newCar]);
        toast.success("Vehicle successfully created!");
      }
      formReset();
      setSelectedCar(null);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // 5. Populate form by selected row when EDIT button is pressed
  useEffect(() => {
    if (!selectedCar) return;

    setForm({
      make: selectedCar.make,
      model: selectedCar.model,
      year: selectedCar.year,
      tuv: selectedCar.tuv,
      plates: selectedCar.plates,
      fuel: selectedCar.fuel,
    });
  }, [selectedCar]);

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsData = await getAllCars();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchData();
  }, []);

  const cancelEdit = () => {
    setSelectedCar(null);
    formReset();
  };

  const {
    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,
  } = useSharedHook(deleteCar, setCars);

  return {
    form,
    setForm,
    inputControll,
    radioButtonControll,
    submitForm,
    formReset,
    cancelEdit,
    editMode: !!selectedCar,
    setSelectedCar,
    isConfirmationDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    deleteConfirmation,
  };
};
