import { createContext, useContext } from "react";

import {
  GovernanceToken,
  InternalMarket,
  NeokingdomToken,
  ResolutionManager,
  TokenMock,
  Voting,
} from "../contracts/typechain";

export type ContractsContextType = {
  resolutionContract?: ResolutionManager;
  neokingdomTokenContract?: NeokingdomToken;
  internalMarketContract?: InternalMarket;
  internalMarketContractAddress?: string;
  votingContract?: Voting;
  governanceTokenContract?: GovernanceToken;
  governanceTokenContractAddress?: string;
  usdcContract?: TokenMock;
};

export const ContractsContext = createContext<ContractsContextType>({});

export const useContractsContext = () => useContext(ContractsContext);
