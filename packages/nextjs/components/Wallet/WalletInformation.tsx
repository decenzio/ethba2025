import WalletInteraction from "~~/components/Wallet/WalletInteraction";
import { useGlobalState } from "~~/services/store/store";

const WalletInformation = ({ className }: { className?: string }) => {
  const walletInfo = useGlobalState(state => state.walletInfo);

  if (!walletInfo) {
    return <p>No wallet connected.</p>;
  }

  return (
    <div className={className}>
      <div className="card bg-gradient-to-r from-accent-content via-secondary/70 to-accent shadow-xl text-white w-110">
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold">Wallet Balance</h2>
          <p className="text-5xl font-bold">6.23 ETH</p>
          <div className="card-actions justify-end mt-4">
            <WalletInteraction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletInformation;
