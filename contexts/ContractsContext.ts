import { createContext, useContext } from "react";

import { InternalMarket, ResolutionManager, TelediskoToken, Voting } from "../contracts/typechain";

export type ContractsContextType = {
  resolutionContract?: ResolutionManager;
  tokenContract?: TelediskoToken;
  internalMarketContract?: InternalMarket;
  votingContract?: Voting;
};

export const ContractsContext = createContext<ContractsContextType>({});

export const useContractsContext = () => useContext(ContractsContext);
