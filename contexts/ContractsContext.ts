import { createContext, useContext } from "react";

import { ResolutionManager, TelediskoToken, Voting } from "../contracts/typechain";

export type ContractsContextType = {
  resolutionContract?: ResolutionManager;
  tokenContract?: TelediskoToken;
  votingContract?: Voting;
};

export const ContractsContext = createContext<ContractsContextType>({});

export const useContractsContext = () => useContext(ContractsContext);
