import api_config from "@/lib/api_config";

// api_config Service layer - communication with backend. No state, toast or React code

export type CarRequest = {
  make: string;
  model: string;
  year: string;
  tuv: string;
  plates: string;
  fuel: string;
};

export type CarResponse = CarRequest & {
  id: number;
};

// 1. Create/Enter new car
export const createCar = async (car: CarRequest): Promise<CarResponse> => {
const response = await api_config.post<CarResponse>("/cars", car);
return response.data;
};



export const carUpdate = async (id: number, data: CarRequest) => {
  const response = await api_config.put<CarRequest>(`/cars/${id}`, data);
  return response.data;
};


