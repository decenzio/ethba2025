import { generateWalletInfo } from "~~/services/deriveAddressService";
import { nostrService } from "~~/services/nostrService";
import { WalletInfo } from "~~/types/walletInfo";

export const connectService = {
  async connect(): Promise<WalletInfo | null> {
    await nostrService.connect();
    const pubkey: string | null = nostrService.getPubkey();

    if (!pubkey) {
      console.error("Connection to nostr failed");
      return null;
    }

    return generateWalletInfo(pubkey, "0xfactoryAddress", "0xinitCode", "salt");
  },
};
