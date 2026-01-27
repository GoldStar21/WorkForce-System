"use client";

import Button from "@/components/Button";

type CarsType = {
  id: number;
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
};

type CarsTableProps = {
  cars: CarsType[];
  setCars: React.Dispatch<React.SetStateAction<CarsType[]>>;
  onEdit: (car: CarsType) => void;
};

const CarsTable = ({ cars, onEdit }: CarsTableProps) => {
  return (
    <div className="carsTable">
      <table className="carsTable__table">
        <thead className="carsTable__thead">
          <tr className="carsTable__tr">
            <th className="carsTable__th">ID</th>
            <th className="carsTable__th">MAKE</th>
            <th className="carsTable__th">MODEL</th>
            <th className="carsTable__th">YEAR</th>
            <th className="carsTable__th">TÜV</th>
            <th className="carsTable__th">PLATES</th>
            <th className="carsTable__th">FUEL</th>
            <th className="carsTable__th"></th>
          </tr>
        </thead>

        <tbody className="carsTable__tbody">
          {cars.map((car) => (
            <tr className="carsTable__tr" key={car.id}>
              <td className="carsTable__td">{car.id}</td>
              <td className="carsTable__td">{car.make}</td>
              <td className="carsTable__td">{car.model}</td>
              <td className="carsTable__td">{car.year}</td>
              <td className="carsTable__td">{car.tuv}</td>
              <td className="carsTable__td">{car.plates}</td>
              <td className="carsTable__td">{car.fuel}</td>

              <td className="carsTable__buttons">
                <Button label="EDIT" modifier="button--edit" onClick={() => onEdit(car)}/>
                <Button label="DELETE" modifier="button--delete"  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsTable;
