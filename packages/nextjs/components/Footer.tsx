import React from "react";
import { hardhat } from "viem/chains";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

const SHOW_SWITCH_THEME = false;

/**
 * Site footer
 */
export const Footer = () => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      {SHOW_SWITCH_THEME && (
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      )}
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <p className="m-0 text-center">
              Built with <HeartIcon className="inline-block h-4 w-4" /> by{" "}
              <a target="_blank" href="https://www.decenzio.com/" title="Decenzio" className="text-accent">
                Decenzio
              </a>
            </p>
          </div>
        </ul>
      </div>
    </div>
  );
};
