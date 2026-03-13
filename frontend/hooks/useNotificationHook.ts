import { useEffect, useState } from "react";
import { CarsType } from "./useCarHook";
import { getAllCars } from "@/lib/services/cars_service";


export const useNotificationHook = () => {

    const [cars, setCars] = useState<CarsType[]>([]);

    const[isOpenNotification, setOpenNotification] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllCars();

            setCars(data.filter((f) => {
                const tuv = new Date(f.tuv);
                const today = new Date();
                const diffDays = (tuv.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
                return diffDays <= 30 && diffDays > 0;
            }))
        }

        fetchData();
    },[]);

    return {
        cars,
    isOpenNotification,
        setOpenNotification,
    }
};