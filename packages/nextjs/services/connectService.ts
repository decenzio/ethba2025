import { generateWalletInfo } from "~~/services/deriveAddressService";
import { nostrService } from "~~/services/nostrService";
import { useGlobalState } from "~~/services/store/store";
import type { ConnectService, WalletInfo } from "~~/types/import";

import { createSmartAccountClient } from "permissionless";
import { sepolia } from "viem/chains";
import { http, createPublicClient } from "viem";
import { toNostrSmartAccount } from "./accountService";
import { getPublicClient } from "wagmi/actions";

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

    const account = await toNostrSmartAccount({
      client: createPublicClient({chain: sepolia, transport: http("https://eth-sepolia.public.blastapi.io")}),
      owner: `0x${pubkey}`
    })

    // Create the required clients.
    const bundlerClient = createSmartAccountClient({
      account,
      chain: sepolia,
      bundlerTransport: http(
        `https://api.pimlico.io/v2/11155111/rpc?apikey=pim_X5CHVGtEhbJLu7Wj4H8fDC`,
      ), // Use any bundler url
    });

    console.log(await account.getAddress());

    const txHash = await bundlerClient.sendTransaction({
      to: '0x66bAd48301609adaa01CB3140D1b1D92bFa03dD5', // address you want to send to
      value: BigInt(1e16),      // amount in wei (e.g., 0.01 ETH)
      data: '0x',               // optional calldata, '0x' for simple ETH transfer
    });

  console.log('UserOperation hash:', txHash);

    return { walletInfo: walletInfo, nPubkey: nPubkey };
  },
}; 