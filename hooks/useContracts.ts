import { Signer } from "ethers";
import { useAccount, useNetwork, useSigner } from "wagmi";

import { useEffect, useState } from "react";

import { ResolutionManager } from "../contracts/typechain/contracts/ResolutionManager/ResolutionManager";
import { ResolutionManager__factory } from "../contracts/typechain/factories/contracts/ResolutionManager/ResolutionManager__factory";
import networksNeoKingdom from "../networks/neokingdom.json";
import networksTeledisko from "../networks/teledisko.json";

const networks: Record<string, any> =
  process.env.NEXT_PUBLIC_PROJECT_KEY === "neokingdom" ? networksNeoKingdom : networksTeledisko;

const getResolutionContract = (chainId: string, signer: Signer): ResolutionManager => {
  const address = networks[chainId]["ResolutionManager"];
  return ResolutionManager__factory.connect(address, signer);
};

interface ContractsState {
  resolutionContract?: ResolutionManager;
}

export function useContracts() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  const [contracts, setContracts] = useState<ContractsState>({});

  useEffect(() => {
    if (address && signer) {
      const chainId = String(chain?.id);

      setContracts({
        resolutionContract: getResolutionContract(chainId, signer),
      });
    }
  }, [address, signer, chain?.id]);

  return {
    contracts,
  };
}
