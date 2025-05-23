"use client";

import React from "react";
import type { NextPage } from "next";
import { WalletInformation, WalletInteraction } from "~~/components/Wallet/import";

const Home: NextPage = () => {
  const [pubkey, setPubkey] = React.useState<string | null>(null);

  // Listing to nostr pubkey changes
  React.useEffect(() => {
    const handlePubkeyChange = (event: CustomEvent<string>) => {
      setPubkey(event.detail);
    };

    window.addEventListener("nostr:pubkey", handlePubkeyChange as EventListener);

    return () => {
      window.removeEventListener("nostr:pubkey", handlePubkeyChange as EventListener);
    };
  }, []);

  return (
    <div className={"container mx-auto"}>
      <div className={"flex flex-col gap-5 pt-15"}>
        {pubkey ? (
          <>
            <div className="flex items-center flex-col grow pt-10">Your public key: {pubkey}</div>
            <WalletInformation />
            <WalletInteraction />
          </>
        ) : (
          <p className="text-center">TODO add button to connect</p>
        )}
      </div>
    </div>
  );
};

export default Home;
