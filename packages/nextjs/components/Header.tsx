"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { nostrService } from "~~/services/nostrService";

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
  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  const [connectedPubkey, setConnectedPubkey] = React.useState<string | null>(null);

  const handleConnectClick = async () => {
    try {
      await nostrService.connect();
      const npub = nostrService.getNPubkey();
      setConnectedPubkey(npub);
    } catch (e: unknown) {
      console.warn("Connection to nostr failed", e);
    }
  };

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 shrink-0 justify-between z-20 shadow-md px-0 sm:px-2">
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
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">PrettyName</span>
            <span className="text-xs">Decenzio</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end grow mr-4">
        {connectedPubkey ? (
          <div className="tooltip tooltip-left tippy--fit-width" data-tip={connectedPubkey}>
            <button
              className="btn btn-secondary btn-dash max-w-[180px] truncate flex items-center gap-2"
              onClick={() => {
                if (connectedPubkey) {
                  navigator.clipboard.writeText(connectedPubkey);
                  const toast = document.createElement("div");
                  toast.className = "toast toast-top toast-end z-50";
                  toast.innerHTML = `
                    <div class="alert alert-success">
                      <span>Copied to clipboard</span>
                    </div>
                  `;
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 3000);
                }
              }}
            >
              {`${connectedPubkey.slice(0, 6)}…${connectedPubkey.slice(-6)}`}
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        ) : (
          <button
            className="btn btn-secondary btn-dash"
            onClick={handleConnectClick}
            title={connectedPubkey ?? "You must connect first"}
          >
            You must connect first
          </button>
        )}
      </div>
    </div>
  );
};
