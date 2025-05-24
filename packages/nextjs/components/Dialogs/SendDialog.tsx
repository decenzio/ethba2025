"use client";

import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

const SendDialog = ({ className, id }: { className?: string; id: string }) => {
  return (
    <dialog id={id} className={`modal ${className ?? ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Send to wallet address</h3>
        <form method="dialog" className="flex justify-center mt-4 flex-col">
          <fieldset className="fieldset w-full relative">
            <legend className="fieldset-legend">Wallet address</legend>
            <input type="text" className="input w-full" placeholder="Type wallet address here" />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Amount</legend>
            <input type="text" className="input w-full" placeholder="Amount" />
          </fieldset>
          <div className="flex justify-end gap-4 w-full mt-5">
            <button className="btn btn-dash">Close</button>
            <button type="button" className="btn btn-secondary">
              <PaperAirplaneIcon className="h-6 w-6 -ml-2 inline" />
              Send to this address
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SendDialog;
