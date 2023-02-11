import { useAccount } from "wagmi";

import { addToIpfs } from "@lib/ipfs";

import useAlertStore from "@store/alertStore";
import useBlockchainTransactionStore from "@store/blockchainTransactionStore";

import { ResolutionFormBase } from "../store/resolutionFormStore";
import { useContracts } from "./useContracts";

type SubmitParams = {
  vetoTypeId: string | null;
  resolutionId: string;
  currentResolution: ResolutionFormBase;
};

export default function useResolutionUpdate() {
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
    onSubmit: async ({ vetoTypeId, resolutionId, currentResolution }: SubmitParams) => {
      setBlockchainTransactionState(true, false);

      try {
        const ipfsId = await addToIpfs(currentResolution);
        const resolutionTypeId = Number(vetoTypeId || currentResolution.typeId);
        const tx = await contracts.resolutionContract?.updateResolution(
          resolutionId,
          ipfsId,
          resolutionTypeId,
          !!vetoTypeId,
          [],
          [],
        );
        setBlockchainTransactionState(true, true);
        openAlert({ message: "Transaction is being executed, hold tight", severity: "info" });
        await tx?.wait();
        setBlockchainTransactionState(true, false);
        openAlert({ message: "Pre draft resolution correctly updated", severity: "success" });
        reset();
        return true;
      } catch (err) {
        openAlert({ message: "Error updating pre draft resolution", severity: "error" });
        console.error(err);
        reset();
        return false;
      }
    },
  };
}
