import { createCar } from "@/lib/services/cars_service";
import { useState } from "react";
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
}

// Hook for CarForm
export const useCarForm = (cars: CarsType[], setCars: React.Dispatch<React.SetStateAction<CarsType[]>>) => {

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
    const {name, value} = e.target;
    setForm(prev => ({
    ...prev,
    [name]: name === "plates" ? value.toUpperCase() : value,
  }));
  };

  // 3. Radio button controll
  const radioButtonControll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((buttonChoice) => ({...buttonChoice, fuel: e.target.value}));
  };

  // 4. Submit form
  const submitForm = async () => {

    try{                    //Promise
      const response = await createCar(form);
      toast.success("Vehicle successfully created!", { duration: 4000 });

      setCars([...cars, response]);
      setForm({ make: "", model: "", year: "", tuv: "", plates: "", fuel: "" });
    } catch {
      toast.error("Vehicle is not saved, something went wrong!", { duration: 4000 });
    }
  };


 
  return {
    form,
    setForm,
    inputControll,
    radioButtonControll,
    submitForm,
  };
};
