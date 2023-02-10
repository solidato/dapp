import { useAccount } from "wagmi";

import { addToIpfs } from "@lib/ipfs";

import useAlertStore from "@store/alertStore";
import useBlockchainTransactionStore from "@store/blockchainTransactionStore";

import { ResolutionFormBase } from "../store/resolutionFormStore";
import { useContracts } from "./useContracts";

type SubmitParams = {
  vetoTypeId: string | null;
  currentResolution: ResolutionFormBase;
  executionTo?: string[];
  executionData?: string[];
};

export default function useResolutionCreate() {
  const { address } = useAccount();
  const { openAlert } = useAlertStore();
  const { set: setBlockchainTransactionState, reset } = useBlockchainTransactionStore();
  const { contracts } = useContracts();

  if (!address) {
    openAlert({ message: "Please connect your wallet", severity: "error" });
    return {
      onSubmit: () => {},
    };
  }

  return {
    onSubmit: async ({ vetoTypeId, currentResolution, executionTo = [], executionData = [] }: SubmitParams) => {
      setBlockchainTransactionState(true, false);

      try {
        const ipfsId = await addToIpfs(currentResolution);
        const resolutionTypeId = Number(vetoTypeId || currentResolution.typeId);
        const tx = await contracts.resolutionContract?.createResolution(
          ipfsId,
          resolutionTypeId,
          !!vetoTypeId,
          executionTo,
          executionData,
        );
        setBlockchainTransactionState(true, true);
        await tx.wait();
        setBlockchainTransactionState(true, false);
        openAlert({ message: "Resolution correctly saved", severity: "success" });
        reset();
        return true;
      } catch (err) {
        openAlert({ message: "Error saving resolution", severity: "error" });
        console.error(err);
        reset();
        return false;
      }
    },
  };
}
