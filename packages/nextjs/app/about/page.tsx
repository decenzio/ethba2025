"use client";

import React from "react";
import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">About This Service</h1>
      <p className="text-lg mb-6">
        This service provides a user-friendly interface to interact with Ethereum-based identities and wallets using
        Nostr. Nostr. It aims to simplify blockchain experiences and improve accessibility for developers and users
        alike.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Features</h2>
      <p className="text-md">
        This project is developed as part of the ETHBA 2025 initiative to foster innovation in decentralized
        technologies.
      </p>
    </div>
  );
};

export default About;
