import { toNostrSmartAccount } from "./accountService";
import { connectService } from "./connectService";
import { createSmartAccountClient } from "permissionless";
import { http } from "viem";
import { base } from "viem/chains";

export const transactionService = {
  async sendTransaction(publicClient: any, to: string, amount: bigint): Promise<string | null> {
    const connectionResponse = await connectService.connect();

    const account = await toNostrSmartAccount({
      client: publicClient,
      owner: `0x${connectionResponse?.ethPubkey}`,
    });

    const bundlerClient = createSmartAccountClient({
      account,
      chain: base,
      bundlerTransport: http(`https://api.pimlico.io/v2/8453/rpc?apikey=pim_X5CHVGtEhbJLu7Wj4H8fDC`), // Use any bundler url
    });

    const estimateFees = await publicClient.estimateFeesPerGas();

    const txHash = await bundlerClient.sendTransaction({
      to, // address you want to send to
      value: amount, // amount in wei (e.g., 0.01 ETH)
      data: "0x", // optional calldata, '0x' for simple ETH transfer
      maxFeePerGas: estimateFees.maxFeePerGas * 15n,
      maxPriorityFeePerGas: 1250000n,
    });

    return txHash;
  },
};
