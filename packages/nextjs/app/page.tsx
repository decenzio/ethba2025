"use client";

import React from "react";
import type { NextPage } from "next";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ErrorDialog, ReceiveDialog, SearchWalletAddressDialog, SendDialog, WalletCard } from "~~/components/import";
import { connectService } from "~~/services/connectService";

const Home: NextPage = () => {
  const [pubkey, setPubkey] = React.useState<string | null>(null);
  const [showSkull, setShowSkull] = React.useState(false);
  const [bouncing, setBouncing] = React.useState(false);

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

  const handleConnectButton = async () => {
    const response = await connectService.connect();
    if (!response) {
      const errorDialog = document.getElementById("error-modal") as HTMLDialogElement | null;
      if (errorDialog) {
        errorDialog.showModal();
        const titleElem = errorDialog.querySelector("h3");
        const descElem = errorDialog.querySelector("p");
        if (titleElem) titleElem.textContent = "Connection Error";
        if (descElem) descElem.textContent = "Unable to connect to Nostr extension.";
      }
    }
  };

  const handleOpenModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className={"container mx-auto"}>
      <div className={"flex flex-col gap-5"}>
        {pubkey ? (
          <div className={"flex flex-col gap-8 items-center justify-center pb-10 grow h-fill"}>
            <WalletCard className="opacity-0 animate-slideIn" />
            <button
              className="btn btn-dash btn-success animate-slideIn"
              onClick={() => handleOpenModal("wallet-search-modal")}
            >
              <MagnifyingGlassCircleIcon className="h-6 w-6 mr-2 inline" />
              Search address of npub
            </button>
          </div>
        ) : (
          <div className="px-20 flex flex-col gap-4 m-auto w-fit justify-center items-start grow h-fill text-4xl">
            <div className="flex flex-col gap-4 animate-fadeIn item-start">
              <p className="text-5xl m-0 opacity-0 animate-slideIn delay-100">
                {showSkull ? "Bye " : "Hello "}
                <span
                  className={`cursor-pointer inline-block transition-transform duration-200 ${bouncing ? "scale-125" : ""}`}
                  onClick={() => {
                    setShowSkull(true);
                    setBouncing(true);
                    setTimeout(() => setBouncing(false), 300);
                  }}
                >
                  {showSkull ? "💀" : "👋"}
                </span>
              </p>
              <p className="m-0 opacity-0 animate-slideIn delay-500 ">
                to continue, <br />
                please{" "}
                <u className="hover:no-underline cursor-pointer" onClick={handleConnectButton}>
                  connect
                </u>{" "}
                to your Nostr account.
              </p>
              <div className="opacity-0 animate-slideIn delay-1000">
                <button
                  className="btn btn-lg btn-secondary mt-5 hover:gap-4 transition-all w-fit "
                  onClick={handleConnectButton}
                >
                  Connect <ArrowRightIcon className="h-6 w-6 ml-2 inline" />
                </button>
              </div>
              <div className="opacity-0 animate-slideIn delay-1500">
                <hr className="opacity-20 mt-5" />
                <div className="opacity-70 text-base hover:opacity-100 transition-all">
                  <div className="mb-3 mt-5">Or just search for a wallet address using the npub </div>
                  <button
                    className="btn btn-dash hover:btn-outline hover:border-white"
                    onClick={() => handleOpenModal("wallet-search-modal")}
                  >
                    <MagnifyingGlassCircleIcon className="h-6 w-6 mr-2 inline" />
                    Search address of npub
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ReceiveDialog id="receive-modal" />
      <SendDialog id="send-modal" />
      <ErrorDialog id="error-modal" title="Connection Error" description="Unable to connect to the Nostr extension." />
      <SearchWalletAddressDialog id="wallet-search-modal" />
    </div>
  );
};

export default Home;
