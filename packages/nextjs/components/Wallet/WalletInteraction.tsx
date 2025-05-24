"use client";

import React from "react";
import { ReceiveDialog } from "~~/components/import";

const WalletInteraction = ({ className }: { className?: string }) => {
  const handleOpenModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className={className}>
      <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-5">
        <button className="btn btn-soft btn-lg btn-warning flex-1 text-lg">Send</button>
        <button
          className="btn btn-soft btn-lg btn-accent flex-1 text-lg tooltip"
          data-tip="Display shareable wallet information"
          onClick={() => handleOpenModal("receive-modal")}
        >
          Receive
        </button>
      </div>
      <ReceiveDialog id="receive-modal" />
    </div>
  );
};

export default WalletInteraction;
