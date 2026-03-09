import api_config from "@/lib/api_config";

// api_config Service layer - communication with backend. No state, toast or React code

export type EmployeeRequest = {
  name: string;
  surname: string;
  email: string;
  job: string;
  languages: string[];
};

type EmployeeType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  languages: string[];
  job: string;
};

export type EmployeeResponse = EmployeeRequest & {
  id: number;
};

// 1. Kreiranje zaposlenog
export const createEmployee = async (employee: EmployeeRequest): Promise<EmployeeResponse> => {
  const result = await api_config.post<EmployeeResponse>("/employees", employee);
  return result.data;
};

// 2. Azuriranje zaposlenog
export const updateEmployee = async (id: number, data: EmployeeRequest) : Promise<EmployeeType> =>{
  const response = await api_config.put<EmployeeType>(`/employees/${id}`, data);
  return response.data;
}

// 3. Dohvati sve zaposlene
export const getAllAssemblers = async (): Promise<EmployeeResponse[]> => {
  const response = await api_config.get<EmployeeResponse[]>("/employees");
  return response.data;
};

//4. Izbrisi sve zaposlene
export const deleteAssembler = async (id: number): Promise<void> => {
  await api_config.delete(`/employees/${id}`);
};