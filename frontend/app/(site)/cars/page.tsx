"use client";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createCar, getAllCars, deleteCar } from "@/lib/api3service";

const Cars = () => {
  type Car = {
    id: number;
    make: string;
    model: string;
    year: string;
    tuv: string;
    plates: string;
    fuel: string;
  };

  const [cars, setCars] = useState<Car[]>([]);

  type FormData = {
    make: string;
    model: string;
    year: string;
    tuv: string;
    plates: string;
    fuel: string;
  };

  // State za input polja
  const [carsForm, setCarsForm] = useState<FormData>({
    make: "",
    model: "",
    year: "",
    tuv: "",
    plates: "",
    fuel: "",
  });

  // Fukncija za brisanje
  const hadnleDeleteCar = async (id: number) : Promise<void> => {
    await deleteCar(id);
  }

  // Funkcija za pračenje input polja
  const inputMonitor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCarsForm((past) => ({
      ...past,
      [name]: name === "plates" ? value.toUpperCase() : value,
    }));
  };

  // Submit form
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // API call to create new car VIDI STO NE RADI
      const responseNewCar = await createCar(carsForm);
      toast.success("Car successfully created", {duration: 4000,});

      setCars(prev => [...prev, responseNewCar]);

      setCarsForm({
        make: "",
        model: "",
        year: "",
        tuv: "",
        plates: "",
        fuel: "",
      });
    } catch (error) {
      toast.error("Error occured while saving new car!", {
        duration: 4000,
      });
    }
  };
  useEffect(() => {
      const fetchCars = async () => {
        try{
          const data = await getAllCars();
          setCars(data);
        }catch (error) {
        console.error("Greška pri dohvaćanju zaposlenika:", error);
      }
      };
      fetchCars();
    }, []);

  return (
    <div className="cars">
      {/* FORM */}

      <form className="cars__form" onSubmit={formSubmit}>
        <div className="cars__container">
          <h2 className="cars__formTitle">CREATE NEW CAR</h2>
          <label htmlFor="make" className="cars__label">
            MAKE:
          </label>
          <input
            id="make"
            type="text"
            className="cars__input"
            name="make"
            value={carsForm.make}
            onChange={inputMonitor}
            placeholder="Enter make"
            autoComplete="off"
            required
          />
        </div>

        <div className="cars__container">
          <label htmlFor="model" className="cars__label">
            MODEL:
          </label>
          <input
            id="model"
            type="text"
            className="cars__input"
            name="model"
            value={carsForm.model}
            onChange={inputMonitor}
            placeholder="Enter model"
            autoComplete="off"
            required
          />
        </div>

        <div className="cars__container">
          <label htmlFor="year" className="cars__label">
            YEAR:
          </label>
          <input
            id="year"
            type="text"
            className="cars__input"
            name="year"
            value={carsForm.year}
            onChange={inputMonitor}
            placeholder="Enter year"
            autoComplete="off"
            required
          />
        </div>

        <div className="cars__container">
          <label htmlFor="tuv" className="cars__label">
            TÜV EXPIRE:
          </label>
          <input
            id="tuv"
            type="date"
            className="cars__input"
            name="tuv"
            value={carsForm.tuv}
            onChange={inputMonitor}
            placeholder="Date"
            autoComplete="off"
            required
          />
        </div>

        <div className="cars__container">
          <label htmlFor="plates" className="cars__label">
            PLATES:
          </label>
          <input
            id="plates"
            type="text"
            className="cars__input"
            name="plates"
            value={carsForm.plates}
            onChange={inputMonitor}
            placeholder="Enter plates"
            autoComplete="off"
            required
          />
        </div>

        <div className="cars__container">
          <label className="cars__label">FUEL:</label>

          <label className="cars__radioLabel">
            <input
              type="radio"
              name="fuel"
              value="bensin"
              checked={carsForm.fuel == "bensin"}
              onChange={inputMonitor}
            />
            Bensin
          </label>

          <label className="cars__radioLabel">
            <input
              type="radio"
              name="fuel"
              value="diesel"
              checked={carsForm.fuel == "diesel"}
              onChange={inputMonitor}
            />
            Diesel
          </label>
        </div>

        <Button label="Save" type="submit" modifier="button-login" />
      </form>

      {/* TABLE */}

      <div className="cars__wrapper">
        <table className="cars__table">
          <thead className="cars__thead">
            <tr className="cars__tr">
              <th className="cars__th">ID</th>
              <th className="cars__th">MAKE</th>
              <th className="cars__th">MODEL</th>
              <th className="cars__th">YEAR</th>
              <th className="cars__th">TÜV</th>
              <th className="cars__th">PLATES</th>
              <th className="cars__th">FUEL</th>
              <th className="cars__th"></th>
            </tr>
          </thead>

          <tbody className="cars__tbody">
            {cars.map((car) => (
              <tr className="cars__tr" key={car.id}>
                <td className="cars__td">{car.id}</td>
                <td className="cars__td">{car.make}</td>
                <td className="cars__td">{car.model}</td>
                <td className="cars__td">{car.year}</td>
                <td className="cars__td">{car.tuv}</td>
                <td className="cars__td">{car.plates}</td>
                <td className="cars__td">{car.fuel}</td>

                <td className="cars__buttons">
                  <Button label="EDIT" modifier="actions" />
                  <Button label="DELETE" onClick={() => hadnleDeleteCar(car.id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cars;
