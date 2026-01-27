import users from "./api2";

// TypeScript konfiguracija

export interface AssemblerRequest {
  name: string;
  surname: string;
  email: string;
  job: string;
  languages: string[]; // frontend šalje nazive jezika
}

export interface AssemblerResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
  job: string;
  languages: string[]; // backend vraća nazive jezika
}

export type Employee = AssemblerResponse;

export interface CarRequest {
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
};

export interface CarResponse {
  id: number;
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
};

//--------------------------------------------------------------


// Funkcija za kreiranje novog assemblera
export const createAssembler = async (assembler: AssemblerRequest): Promise<AssemblerResponse> => {
  const response = await users.post<AssemblerResponse>("", assembler);
  return response.data;
};

// Funkcija za dohvatanje svih assemblera
export const getAllAssemblers = async (): Promise<AssemblerResponse[]> => {
  const response = await users.get<AssemblerResponse[]>("");
  return response.data;
};

// Service za brisanje zaposlenog
export const deleteAssembler = async (id: number): Promise<void> => {
  await users.delete(`/${id}`);
}

export const updateEmployeeService = async (id: number, formData: Employee): Promise<Employee> => {
  const response = await users.put<Employee>(`/${id}`, formData);
  return response.data;
}





// Bez typescriota

/*

export const createCar = async (car: CarRequest) : Promise<CarResponse> => {
const response = await users.post<CarResponse>("", car);
  return response.data;
}

export const createAssembler = async (assembler) => {
  const response = await users.post("", assembler);
  return response.data;
};
*/