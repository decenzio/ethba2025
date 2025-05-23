import { useGlobalState } from "~~/services/store/store";

const WalletInformation = ({ className }: { className?: string }) => {
  const walletInfo = useGlobalState(state => state.walletInfo);

  return (
    <div className={className}>
      {walletInfo ? (
        <>
          <p>
            <strong>Nostr Pubkey:</strong> {walletInfo.nostrPubkey}
          </p>
          <p>
            <strong>Ethereum Address:</strong> {walletInfo.ethAddress}
          </p>
          <p>
            <strong>Wallet Address:</strong> {walletInfo.walletAddress}
          </p>
        </>
      ) : (
        <p>No wallet connected.</p>
      )}
    </div>
  );
};

export default WalletInformation;
