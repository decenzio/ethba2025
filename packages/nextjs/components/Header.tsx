"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { WalletToggle } from "~~/components/Wallet/import";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { connectService } from "~~/services/connectService";
import { useGlobalState } from "~~/services/store/store";

const SHOW_NAVBAR = false;

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link href={href} passHref className={`${!isActive ? "btn-outline" : ""} btn btn-primary`}>
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  const nPubkey = useGlobalState(state => state.nPubkey);

  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  const handleConnectClick = async () => {
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

  return (
    <div className="sticky lg:static top-0 navbar  min-h-0 shrink-0 justify-between z-20  px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <details className="dropdown" ref={burgerMenuRef}>
          <summary className="ml-1 btn btn-ghost lg:hidden hover:bg-transparent">
            <Bars3Icon className="h-1/2" />
          </summary>
          <ul
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-sm bg-base-100 rounded-box w-52"
            onClick={() => {
              burgerMenuRef?.current?.removeAttribute("open");
            }}
          >
            <HeaderMenuLinks />
          </ul>
        </details>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10 bg-transparent rounded-2xl">
            <Image alt="SE2 logo" className="cursor-pointer invert rounded-md" fill src="/logo.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">ETHSTR</span>
            <span className="text-xs">by Decenzio</span>
          </div>
        </Link>
        {SHOW_NAVBAR && (
          <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
            <HeaderMenuLinks />
          </ul>
        )}
      </div>
      <div className="navbar-end grow mr-4">
        {nPubkey ? (
          <WalletToggle />
        ) : (
          <button className="btn btn-secondary btn-dash" onClick={handleConnectClick} title={"You must connect first"}>
            <ExclamationTriangleIcon className="h-1/2" />
            You must connect first
          </button>
        )}
      </div>
    </div>
  );
};
