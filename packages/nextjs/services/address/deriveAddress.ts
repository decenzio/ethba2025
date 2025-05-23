import { getCreate2Address } from "@ethersproject/address";
import { bech32 } from "bech32";
import { ec as EC } from "elliptic";
import { keccak256 } from "ethers";
import { ethers } from "ethers";

const ec = new EC("secp256k1");

// Step 1: Decode npub
function decodeNpub(npub: string): Uint8Array {
  const { words } = bech32.decode(npub);
  const data = bech32.fromWords(words);
  return Uint8Array.from(data);
}

// Step 2: Convert raw pubkey to Ethereum address
function pubkeyToEthAddress(pubkey: Uint8Array): string {
  const key = ec.keyFromPublic(pubkey, "hex");
  const uncompressed = key.getPublic(false, "hex"); // includes '04'
  const uncompressedBytes = Uint8Array.from(Buffer.from(uncompressed, "hex")); // <- Fix here
  const ethAddress = keccak256(uncompressedBytes).slice(-40);
  return ethers.getAddress("0x" + ethAddress);
}

// Step 3: Compute CREATE2 smart account address
function computeSmartWalletAddress(factory: string, salt: string, initCode: string): string {
  return getCreate2Address(factory, salt, keccak256(initCode));
}

// === Run Experiment ===
const npub = "npub1..."; // Replace with real npub
const factoryAddress = "0xYourFactoryAddress";
const saltHex = ethers.id("your-salt"); // or hash of npub
const initCode = "0xYourInitCode"; // must match your smart account creation code

const nostrPubkey = decodeNpub(npub);
const ethOwner = pubkeyToEthAddress(nostrPubkey);

console.log("Derived Ethereum Address:", ethOwner);

const address = computeSmartWalletAddress(factoryAddress, saltHex, initCode);
console.log("ERC-4337 Smart Wallet Address:", address);
