import { useGlobalState } from "~~/services/store/store";

export const transactionService = {
  async sendTransaction(to: string, amount: bigint): Promise<string | null> {
    const publicClient = useGlobalState.getState().publicClient;

    const bundlerClient = useGlobalState.getState().bundlerClient;

    const estimateFees = await publicClient.estimateFeesPerGas();

    return await bundlerClient.sendTransaction({
      to, // address you want to send to
      value: amount, // amount in wei (e.g., 0.01 ETH)
      data: "0x", // optional calldata, '0x' for simple ETH transfer
      maxFeePerGas: estimateFees.maxFeePerGas * 15n,
      maxPriorityFeePerGas: 1250000n,
    });
  },
};
