import { CarRequest, getSelectedCar } from "@/lib/services/cars_service"
import { useEffect, useState } from "react"

// Hook for first step od editing process, population of the input form by selected row
export const useCarFormEdit = (carId: number) => {

    // 1. State for selected data
    const [editData, setEditData] = useState<CarRequest>(); 

    // 2. Get that data  SUVISNO
    useEffect(() => {

        if(!carId) return;

        const getCar = async () => { 
            const data = await getSelectedCar(carId);
            setEditData(data);
        };

        getCar();
    },[carId]);

    return {
        editData,
        setEditData,
    };
};