import { getAllGroups } from "@/lib/services/group_service";
import { useEffect, useState } from "react";

export type GroupLocation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

/**
 * State za lokaciju. Fetchovanje svih grupa.
 */

export const useMapHook = () => {
  const [location, setLocation] = useState<GroupLocation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const groups = await getAllGroups();

      const activeGroups = groups.filter(
        (group) => new Date(group.dateTo) > new Date(),
      );

      const locationData = await Promise.all(
        activeGroups.map(async (group) => {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${group.adress},${group.country}&format=json`,
          );

          const data = await response.json();

          if (data.length === 0) return null;

          return {
            id: group.id,
            name: group.name,
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          };
        }),
      );

      setLocation(locationData.filter((loc) => loc !== null));
    };
    fetchData();
  }, []);
  return { location };
};
