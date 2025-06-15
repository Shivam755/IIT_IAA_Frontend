'use client';
import { createContext, useContext, useState, ReactNode } from "react";
import InstanceViewDTO from "../models/InstanceViewDTO";
import InstanceRequest from "../models/InstanceRequest";
import { fetchAllInstances } from "../services/InstanceService";

const InstancesContext = createContext<
  | {
      Instances: InstanceViewDTO[];
      setInstances: React.Dispatch<React.SetStateAction<InstanceViewDTO[]>>;
      refreshInstances: (reques:InstanceRequest) => void
    }
  | undefined
>(undefined);

interface InstancesProviderProps {
  children: ReactNode;
}

export const InstancesProvider = ({ children }: InstancesProviderProps) => {
  const [Instances, setInstances] = useState<InstanceViewDTO[]>([]);

  const refreshInstances = async (instanceRequest: InstanceRequest) => {
    let data = await fetchAllInstances(instanceRequest);
    setInstances(data);
  }

  return (
    <InstancesContext.Provider value={{ Instances, setInstances, refreshInstances }}>
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
