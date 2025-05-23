"use client";

import React from "react";
import type { NextPage } from "next";
import { nostrService } from "~~/services/nostrService";

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
    <>
      <div className="flex items-center flex-col grow pt-10">Your public key: {pubkey ?? "Not connected"}</div>
    </>
  );
};

export default Home;
