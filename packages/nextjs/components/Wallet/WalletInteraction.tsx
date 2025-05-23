"use client";

import React from "react";

const WalletInteraction = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="flex w-full flex-col lg:flex-row items-center justify-center">
        <button className="btn btn-soft btn-lg btn-warning w-50 text-2lg">Send</button>
        <div className="divider lg:divider-horizontal text-gray-500">OR</div>
        <button className="btn btn-soft btn-lg btn-accent w-50 text-2lg">Receive</button>
      </div>
    </div>
  );
};

export default WalletInteraction;
