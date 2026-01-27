"use client"

import Button from "@/components/Button";
import { useCarForm } from "@/hooks/useCarForm";
import { useEffect } from "react";

type CarsType = {
  id: number;
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
};

type CarsTypeProps = {
  cars: CarsType[];
  setCars: React.Dispatch<React.SetStateAction<CarsType[]>>;
  selectedCar: CarsType | null;
};

const CarsForm = ({ cars, setCars, selectedCar}: CarsTypeProps) => {
  const { form, setForm, inputControll, radioButtonControll, submitForm, } = useCarForm(
    cars,
    setCars,
  );

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
 
  return (
    <form
      className="carsForm"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <div className="carsForm__container">
        <h2 className="carsForm__formTitle">CREATE NEW CAR</h2>
        <label htmlFor="make" className="carsForm__label">
          MAKE:
        </label>
        <input
          id="make"
          type="text"
          className="carsForm__input"
          name="make"
          value={form.make}
          onChange={inputControll}
          placeholder="Enter make"
          autoComplete="off"
          required
        />
      </div>

      <div className="carsForm__container">
        <label htmlFor="model" className="carsForm__label">
          MODEL:
        </label>
        <input
          id="model"
          type="text"
          className="carsForm__input"
          name="model"
          value={form.model}
          onChange={inputControll}
          placeholder="Enter model"
          autoComplete="off"
          required
        />
      </div>

      <div className="carsForm__container">
        <label htmlFor="year" className="carsForm__label">
          YEAR:
        </label>
        <input
          id="year"
          type="number"
          className="carsForm__input"
          name="year"
          value={form.year}
          onChange={inputControll}
          placeholder="Enter year"
          autoComplete="off"
          min={2010}
          max={new Date().getFullYear()}
          step={1}
          required
        />
      </div>

      <div className="carsForm__container">
        <label htmlFor="tuv" className="carsForm__label">
          TÜV EXPIRE:
        </label>
        <input
          id="tuv"
          type="date"
          className="carsForm__input"
          name="tuv"
          value={form.tuv}
          onChange={inputControll}
          placeholder="Date"
          autoComplete="off"
          required
        />
      </div>

      <div className="carsForm__container">
        <label htmlFor="plates" className="carsForm__label">
          PLATES:
        </label>
        <input
          id="plates"
          type="text"
          className="carsForm__input"
          name="plates"
          value={form.plates}
          onChange={inputControll}
          placeholder="Enter plates"
          autoComplete="off"
          required
        />
      </div>

      <div className="carsForm__container">
        <label className="carsForm__fuelLabel">FUEL:</label>
        <div className="carsForm__containerFuel">
          <label className="carsForm__radioLabel">
            <input
              type="radio"
              name="fuel"
              value="Bensin"
              checked={form.fuel == "Bensin"}
              onChange={radioButtonControll}
            />
            BENSIN
          </label>

          <label className="carsForm__radioLabel">
            <input
              type="radio"
              name="fuel"
              value="Diesel"
              checked={form.fuel == "Diesel"}
              onChange={radioButtonControll}
            />
            DIESEL
          </label>
        </div>
      </div>

      <Button label="Save" type="submit" modifier="button--save" />
    </form>
  );
};

export default CarsForm;
