"use client";

import React from "react";
import type { NextPage } from "next";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
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
            <WalletInformation className="opacity-0 animate-slideIn" />
          </div>
        ) : (
          <div className="px-20 flex flex-col gap-4 m-auto w-fit justify-center items-start grow h-fill text-4xl">
            <div className="flex flex-col gap-4 animate-fadeIn item-start">
              <p className="text-5xl m-0 opacity-0 animate-slideIn delay-100">Hello👋</p>
              <p className="m-0 opacity-0 animate-slideIn delay-500">
                to continue, <br />
                please{" "}
                <u className="hover:no-underline cursor-pointer" onClick={handleConnectButoon}>
                  connect
                </u>{" "}
                to your nost account.
              </p>
              <button
                className="btn btn-lg btn-secondary mt-5 hover:gap-4 transition-all opacity-0 w-fit animate-slideIn delay-1000"
                onClick={handleConnectButoon}
              >
                Connect <ArrowRightIcon className="h-6 w-6 ml-2 inline" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
