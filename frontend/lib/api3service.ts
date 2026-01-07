import cars from "./api3";

export interface CarRequest {
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
}

export interface CarResponse extends CarRequest {
  id: number;
}

// Funkcija za kreiranje novog assemblera
export const createCar = async (
  car: CarRequest
): Promise<CarResponse> => {
  const response = await cars.post("", car);
  return response.data;
};

// Funkcija za dohvat novog auta
export const getAllCars = async (): Promise<CarResponse[]> => {
  const response = await cars.get<CarResponse[]>("");
  return response.data;
}

// Funkcija za brisanje auta na osnovu id-a
export const deleteCar = async (id: number): Promise<void> =>  {
  await cars.delete(`/${id}`);
}