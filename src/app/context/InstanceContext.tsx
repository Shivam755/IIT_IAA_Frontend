"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import InstanceViewDTO from "@/app/models/InstanceViewDTO";
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";
import { fetchAllInstances } from "@/app/services/InstanceService";

const InstancesContext = createContext<
  | {
      Instances: InstanceViewDTO[];
      setInstances: React.Dispatch<React.SetStateAction<InstanceViewDTO[]>>;
      refreshInstances: (
        reques: InstanceCreateDTO
      ) => Promise<InstanceViewDTO[] | undefined>;
    }
  | undefined
>(undefined);

interface InstancesProviderProps {
  children: ReactNode;
}

export const InstancesProvider = ({ children }: InstancesProviderProps) => {
  const [Instances, setInstances] = useState<InstanceViewDTO[]>([]);

  const refreshInstances = async (InstanceCreateDTO: InstanceCreateDTO) => {
    let data: InstanceViewDTO[] | undefined = await fetchAllInstances(
      InstanceCreateDTO
    );
    if (data) {
      setInstances(data);
    }
    return data;
  };

  return (
    <InstancesContext.Provider
      value={{ Instances, setInstances, refreshInstances }}
    >
      {children}
    </InstancesContext.Provider>
  );
};

export const useInstances = () => {
  const context = useContext(InstancesContext);
  if (context === undefined) {
    throw new Error("useInstances must be used within a InstancesProvider");
  }
  return context;
};
