import { toNostrSmartAccount } from "./evmAccount/nostrSmartAccount";
import { createSmartAccountClient } from "permissionless";
import { createPublicClient, http, webSocket } from "viem";
import { base } from "viem/chains";
import { nostrService } from "~~/services/nostrService";
import { useGlobalState } from "~~/services/store/store";
import type { ConnectService } from "~~/types/import";

export const connectService = {
  async connect(): Promise<ConnectService | null> {
    await nostrService.connect();
    const pubkey: string | null = nostrService.getPubkey();
    const npub: string | null = nostrService.getNostrNpub();

    if (!npub || !pubkey) {
      return null;
    }

    const publicClient = createPublicClient({
      chain: base,
      transport: webSocket("wss://base-mainnet.blastapi.io/5648ecee-3f48-4b1f-b060-824a76b34d94"),
    });

    useGlobalState.getState().setPublicClient(publicClient);

    const evmAccount = await toNostrSmartAccount({
      client: publicClient,
      owner: `0x${pubkey}`,
    });

    useGlobalState.getState().setEvmAccount(evmAccount);

    const bundlerClient = createSmartAccountClient({
      account: evmAccount,
      chain: base,
      bundlerTransport: http(`https://api.pimlico.io/v2/8453/rpc?apikey=pim_X5CHVGtEhbJLu7Wj4H8fDC`), // Use any bundler url
    });

    useGlobalState.getState().setBundlerClient(bundlerClient);

    const ethPubKey = (await evmAccount.getAddress()).toString();

    useGlobalState.getState().setWalletAddress(ethPubKey);
    useGlobalState.getState().setNPubKey(npub);

    return { ethPubkey: ethPubKey, nPubkey: npub };
  },
};
