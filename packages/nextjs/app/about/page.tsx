"use client";

import React from "react";
import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">About This Service</h1>
      <div className="space-y-6">
        <p className="text-lg italic">One Key. Many Worlds.</p>
        <p className="text-md">
          We sit directly on top of the Nostr identity layer, so the key that already signs your notes can now sign
          Ethereum transactions too. Any browser extension or mobile app that supports Nostr (Alby, Nos2x, etc.) works
          out of the box—no extra wallet, seed phrase, or plug-in required.
        </p>

        <h2 className="text-2xl font-semibold">
          Deterministic Addresses from any <code>npub</code>
        </h2>
        <p className="text-md">
          Your Nostr public key (<code>npub…</code>) deterministically maps to a checksummed EVM address. It’s the same
          every time, for every chain, and anyone can verify the math. If you have a Nostr account, you already have an
          Ethereum account—just unlock it with the key you’re using today.
        </p>

        <h2 className="text-2xl font-semibold">Powered by Account Abstraction</h2>
        <p className="text-md">
          The project is built on ERC-4337 account abstraction. That means:
          <ul className="list-disc list-inside mt-2">
            <li>
              Smart-wallet features like batched actions, sponsored gas, and social recovery come standard (in future).
            </li>
            <li>
              Your Nostr key remains the single source of truth, while the smart account handles the heavy lifting
              on-chain.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">A Decentralized Bundler—over Nostr</h2>
        <p className="text-md">
          We’ve re-imagined the ERC-4337 bundler as a Nostr relay service. Instead of a single operator, any relay can
          pick up user operations, bundle them, and push them on-chain— keeping the mempool open, permissionless, and
          censorship-resistant.
        </p>

        <h2 className="text-2xl font-semibold">Plug-and-Play API</h2>
        <p className="text-md">
          Developers can hit our REST/Relay endpoint to fetch <code>npub</code> → EVM addresses. No vendor lock-in, no
          proprietary SDK—just open JSON over familiar Nostr events.
        </p>

        <p className="text-md font-semibold">
          Every Nostr user is now an Ethereum user—instantly, securely, and without changing their daily workflow. One
          identity, infinite possibilities.
        </p>
      </div>
      <h2 className="text-2xl font-semibold mb-2">Features</h2>
      <p className="text-md">
        This project is developed as part of the ETHBA 2025 initiative to foster innovation in decentralized
        technologies.
      </p>
    </div>
  );
};

export default About;
