import { nip19 } from "nostr-tools";

let nostrPubkey: string | null = null;

// How to get npubKey: nostrService.getNPubkey()

export const nostrService = {
  /**
   * Connects to the Nostr extension and retrieves the user's public key.
   * The result is cached in nostrService.
   */
  async connect(): Promise<string | null> {
    // @ts-ignore
    if (!window.nostr) {
      throw new Error("nos2x extension not found");
    }

    try {
      // @ts-ignore
      nostrPubkey = await window.nostr.getPublicKey();
      window.dispatchEvent(new CustomEvent("nostr:pubkey", { detail: this.getNPubkey() }));
      return nostrPubkey;
    } catch (error) {
      console.error("Failed to connect to nostr:", error);
      throw error;
    }
  },

  /**
   * Returns the cached Nostr public key.
   */
  getPubkey(): string | null {
    return nostrPubkey;
  },

  getNPubkey(): string | null {
    if (!nostrPubkey) return null;
    return nip19.npubEncode(nostrPubkey);
  },
};
