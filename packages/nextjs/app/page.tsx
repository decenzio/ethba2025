"use client";

import React from "react";
import type { NextPage } from "next";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { WalletInformation } from "~~/components/Wallet/import";
import { connectService } from "~~/services/connectService";

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

  const handleConnectButoon = async () => {
    await connectService.connect();
  };

  return (
    <div className={"container mx-auto"}>
      <div className={"flex flex-col gap-5"}>
        {pubkey ? (
          <div className={"flex flex-col gap-8 items-center justify-center pb-10 grow h-fill"}>
            <WalletInformation />
          </div>
        ) : (
          <div className="flex flex-col gap-8 items-center justify-center grow h-fill">
            <ExclamationCircleIcon height="120px" />
            <button className="btn btn-lg btn-secondary" onClick={handleConnectButoon}>
              Connect to nostr idk what
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
