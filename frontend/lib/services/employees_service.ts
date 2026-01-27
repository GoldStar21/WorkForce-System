import api_config from "@/lib/api_config";

// api_config Service layer - communication with backend. No state, toast or React code

export type EmployeeRequest = {
  name: string;
  surname: string;
  email: string;
  job: string;
  languages: string[];
};

export type EmployeeResponse = EmployeeRequest & {
  id: number;
};


export const createEmployee = async (employee: EmployeeRequest): Promise<EmployeeResponse> => {
  const result = await api_config.post<EmployeeResponse>("/employees", employee);
  return result.data;
};

