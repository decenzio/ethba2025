import { getCreate2Address } from "@ethersproject/address";
// still needed
import { ec as EC } from "elliptic";
import { getAddress, getBytes, id, keccak256 } from "ethers";
import { WalletInfo } from "~~/types/walletInfo";

const ec = new EC("secp256k1");

export function pubkeyToEthAddress(pubkey: string): string {
  const compressedPubkey = `02${pubkey}`;
  const key = ec.keyFromPublic(compressedPubkey, "hex");
  const uncompressed = key.getPublic(false, "hex");

  const uncompressedBytes = getBytes(`0x${uncompressed}`);
  const ethAddress = keccak256(uncompressedBytes).slice(-40);
  return getAddress(`0x${ethAddress}`);
}

export function computeSmartWalletAddress(factory: string, salt: string, initCode: string): string {
  const initCodeHash = keccak256(getBytes(initCode));
  return getCreate2Address(factory, salt, initCodeHash);
}

export function generateWalletInfo(
  nostrPubkey: string,
  factoryAddress: string,
  initCode: string,
  salt: string,
): WalletInfo {
  const ethAddress = pubkeyToEthAddress(nostrPubkey);
  const saltId = id(salt);
  const walletAddress = computeSmartWalletAddress(factoryAddress, saltId, initCode);

  return {
    nostrPubkey,
    ethAddress,
    walletAddress,
  };
}
