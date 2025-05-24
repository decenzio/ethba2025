"use client";

import React from "react";

const SendDialog = ({ className, id }: { className?: string; id: string }) => {
  return (
    <dialog id={id} className={`modal ${className ?? ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Send</h3>
        Fakt neviem co tu
        <form method="dialog" className="flex justify-center mt-4">
          <button className="btn btn-dash">Close</button>
        </form>
      </div>
    </dialog>
  );
};

export default SendDialog;
