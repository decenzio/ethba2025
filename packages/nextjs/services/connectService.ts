import { generateWalletInfo } from "~~/services/deriveAddressService";
import { nostrService } from "~~/services/nostrService";
import { useGlobalState } from "~~/services/store/store";
import { WalletInfo } from "~~/types/walletInfo";

export const connectService = {
  async connect(): Promise<WalletInfo | null> {
    await nostrService.connect();
    const pubkey: string | null = nostrService.getPubkey();

    if (!pubkey) {
      return null;
    }

    const walletInfo: WalletInfo = generateWalletInfo(
      pubkey,
      "0x514910771af9ca656af840dff83e8264ecf986ca",
      "0xc005dc82818d67AF737725bD4bf75435d065D239",
      "salt",
    );

    useGlobalState.getState().setWalletInfo(walletInfo);
    console.log(walletInfo);
    return walletInfo;
  },
};
