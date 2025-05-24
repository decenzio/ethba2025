import { toNostrSmartAccount } from "./accountService";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { nostrService } from "~~/services/nostrService";
import { useGlobalState } from "~~/services/store/store";
import type { ConnectService } from "~~/types/import";

export const connectService = {
  async connect(): Promise<ConnectService | null> {
    await nostrService.connect();
    const pubkey: string | null = nostrService.getPubkey();
    const nPubkey: string | null = nostrService.getNPubkey();

    if (!nPubkey || !pubkey) {
      return null;
    }
    const publicClient = createPublicClient({
      chain: base,
      transport: http("https://base-mainnet.public.blastapi.io"),
    });

    useGlobalState.getState().setPublicClient(publicClient);

    const account = await toNostrSmartAccount({
      client: publicClient,
      owner: `0x${pubkey}`,
    });

    const ethPubKey = (await account.getAddress()).toString();

    useGlobalState.getState().setWalletAddress(ethPubKey);
    useGlobalState.getState().setNPubKey(nPubkey);

    return { ethPubkey: ethPubKey, nPubkey: nPubkey };
  },
};
