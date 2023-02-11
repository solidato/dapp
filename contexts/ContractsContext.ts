import { createContext, useContext } from "react";

import { ResolutionManager } from "../contracts/typechain";

export type ContractsContextType = {
  resolutionContract?: ResolutionManager;
};

export const ContractsContext = createContext<ContractsContextType>({});

export const useContractsContext = () => useContext(ContractsContext);
