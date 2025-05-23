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

    return generateWalletInfo(pubkey, "0x514910771af9ca656af840dff83e8264ecf986ca", "0xc005dc82818d67AF737725bD4bf75435d065D239", "salt");
  },
};
