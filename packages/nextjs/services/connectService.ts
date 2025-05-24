import { toNostrSmartAccount } from "./accountService";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { generateWalletInfo } from "~~/services/deriveAddressService";
import { nostrService } from "~~/services/nostrService";
import { useGlobalState } from "~~/services/store/store";
import type { ConnectService, WalletInfo } from "~~/types/import";

export const connectService = {
  async connect(): Promise<ConnectService | null> {
    await nostrService.connect();
    const pubkey: string | null = nostrService.getPubkey();
    const nPubkey: string | null = nostrService.getNPubkey();

    if (!nPubkey || !pubkey) {
      return null;
    }

    const walletInfo: WalletInfo = generateWalletInfo(
      pubkey,
      "0x514910771af9ca656af840dff83e8264ecf986ca",
      "0xc005dc82818d67AF737725bD4bf75435d065D239",
      "salt",
    );

    useGlobalState.getState().setWalletInfo(walletInfo);
    useGlobalState.getState().setNPubKey(nPubkey);

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

    // Tu sa zevraj posielaju kokotiny
    return { ethPubkey: ethPubKey, nPubkey: nPubkey };
  },
};
