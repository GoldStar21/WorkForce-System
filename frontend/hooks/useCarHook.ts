import { createCar, carUpdate, deleteCar } from "@/lib/services/cars_service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CarForm = {
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
};

type CarsType = {
  id: number;
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
};

// Hook for CarForm
export const useCarForm = (
  cars: CarsType[],
  setCars: React.Dispatch<React.SetStateAction<CarsType[]>>,
  selectedCar: CarsType | null,
  setSelectedCar: React.Dispatch<React.SetStateAction<CarsType | null>>,
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

  // 6. Open/Close Delete dialog
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<number | null>(null);

  const openDeleteDialog = (id: number) => {
    setCarToDelete(id);
    setConfirmationDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setConfirmationDialogOpen(false);
    setCarToDelete(null);
  };

  const confirmDelete = async () => {
    if (carToDelete === null) return;

    try {
      await deleteCar(carToDelete);
      setCars((prev) => prev.filter((e) => e.id !== carToDelete));
      toast.success("Assembler deleted!", { duration: 4000 });
    } catch (error) {
      toast.error("Error deleting assembler!", { duration: 4000 });
    } finally {
      setConfirmationDialogOpen(false);
      setCarToDelete(null);
    }
  };

  return {
    form,
    setForm,
    inputControll,
    radioButtonControll,
    submitForm,
    editMode: !!selectedCar,

    openDeleteDialog,
    isConfirmationDialogOpen,
    closeDeleteDialog,
    confirmDelete,
  };
};
