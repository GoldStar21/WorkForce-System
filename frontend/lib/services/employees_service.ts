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


export const createEmployee = async (employee: EmployeeRequest): Promise<EmployeeResponse> => {
  const result = await api_config.post<EmployeeResponse>("/employees", employee);
  return result.data;
};

export const updateEmployee = async (id: number, data: EmployeeRequest) : Promise<EmployeeType> =>{
  const response = await api_config.put<EmployeeType>(`/employees/${id}`, data);
  return response.data;
}