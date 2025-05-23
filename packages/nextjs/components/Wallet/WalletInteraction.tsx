"use client";

import React from "react";

const WalletInteraction = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-5">
        <button className="btn btn-soft btn-lg btn-warning flex-1 text-lg">Send</button>
        <button className="btn btn-soft btn-lg btn-accent flex-1 text-lg">Receive</button>
      </div>
    </div>
  );
};

export default WalletInteraction;
