"use client";

import { useState } from "react";
import { getCreate2Address } from "@ethersproject/address";
import { bech32 } from "bech32";
import { ec as EC } from "elliptic";
import { ethers, keccak256 } from "ethers";

const ec = new EC("secp256k1");

function decodeNpub(npub: string): Uint8Array {
  const { words } = bech32.decode(npub);
  const data = bech32.fromWords(words);
  return Uint8Array.from(data);
}

function pubkeyToEthAddress(pubkey: Uint8Array): string {
  const key = ec.keyFromPublic(pubkey, "hex");
  const uncompressed = key.getPublic(false, "hex"); // includes '04'
  const uncompressedBytes = Uint8Array.from(Buffer.from(uncompressed, "hex"));
  const ethAddress = keccak256(uncompressedBytes).slice(-40);
  return ethers.getAddress("0x" + ethAddress);
}

function computeSmartWalletAddress(factory: string, salt: string, initCode: string): string {
  return getCreate2Address(factory, salt, keccak256(initCode));
}

export default function WalletTestPage() {
  const [npub, setNpub] = useState("");
  const [factory, setFactory] = useState("");
  const [initCode, setInitCode] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    try {
      setError("");
      const nostrPubkey = decodeNpub(npub);
      const ethAddr = pubkeyToEthAddress(nostrPubkey);
      setEthAddress(ethAddr);

      const salt = ethers.id(npub); // or your own logic
      const walletAddr = computeSmartWalletAddress(factory, salt, initCode);
      setWalletAddress(walletAddr);
    } catch (err: any) {
      setError(err.message || "Error processing input");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nostr → Ethereum Wallet Tool</h1>

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter npub (Nostr public key)"
        value={npub}
        onChange={e => setNpub(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter factory address (0x...)"
        value={factory}
        onChange={e => setFactory(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter init code (0x...)"
        value={initCode}
        onChange={e => setInitCode(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleGenerate}>
        Generate Wallet
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {ethAddress && (
        <p className="mt-4">
          <strong>Ethereum Owner Address:</strong> {ethAddress}
        </p>
      )}
      {walletAddress && (
        <p>
          <strong>ERC-4337 Smart Wallet Address:</strong> {walletAddress}
        </p>
      )}
    </div>
  );
}
