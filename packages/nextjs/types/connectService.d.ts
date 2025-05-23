import { WalletInfo } from "~~/types/walletInfo";

export interface ConnectService {
  walletInfo: WalletInfo;
  nPubkey: string;
}
