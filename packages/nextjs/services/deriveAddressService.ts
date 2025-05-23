import { getCreate2Address } from "@ethersproject/address";
import { ec as EC } from "elliptic";
import { getAddress, id, keccak256 } from "ethers";
import { WalletInfo } from "~~/types/walletInfo";

const ec = new EC("secp256k1");

export function pubkeyToEthAddress(pubkey: string): string {
  // Convert raw 32-byte pubkey (X-only from Nostr) to a compressed format (prefix 02 for even Y)
  const compressedPubkey = `02${pubkey}`;
  const key = ec.keyFromPublic(compressedPubkey, "hex");

  // Get uncompressed public key (04 + X + Y)
  const uncompressed = key.getPublic(false, "hex");

  const uncompressedBytes = Uint8Array.from(Buffer.from(uncompressed, "hex"));
  const ethAddress = keccak256(uncompressedBytes).slice(-40);
  return getAddress("0x" + ethAddress);
}

export function computeSmartWalletAddress(factory: string, salt: string, initCode: string): string {
  return getCreate2Address(factory, salt, keccak256(Buffer.from(initCode.slice(2), "hex")));
}

export function generateWalletInfo(
  nostrPubkey: string,
  factoryAddress: string,
  initCode: string,
  salt: string,
): WalletInfo {
  const ethAddress = pubkeyToEthAddress(nostrPubkey);
  const saltId = id(salt); // hashes the UTF-8 bytes of the salt string
  const walletAddress = computeSmartWalletAddress(factoryAddress, saltId, initCode);

  return {
    nostrPubkey,
    ethAddress,
    walletAddress,
  };
}
