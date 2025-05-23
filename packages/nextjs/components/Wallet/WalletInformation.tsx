import { Balance } from "../scaffold-eth/Balance";
import WalletInteraction from "~~/components/Wallet/WalletInteraction";
import { useGlobalState } from "~~/services/store/store";

const WalletInformation = ({ className }: { className?: string }) => {
  const walletInfo = useGlobalState(state => state.walletInfo);

  if (!walletInfo) {
    return <p>No wallet connected.</p>;
  }

  return (
    <div className={className}>
      <div className="relative">
        <Balance
          address={"vitalik.eth"}
          render={({ display, isLoading, isError }) => {
            let bgClasses = "bg-white pulse-size";
            if (isError) {
              bgClasses = "bg-red-500 opacity-50 transition-all scale-[1.4]";
            } else if (!isLoading) {
              bgClasses = "bg-green-400 opacity-40 pulse-size";
            }

            return (
              <>
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <div className={`w-[300px] h-[300px] rounded-full ${bgClasses} opacity-10`}></div>
                </div>
                <div className="text-2xl h-[40px] flex items-center">{display}</div>
              </>
            );
          }}
        />
        <div className="card bg-gradient-to-r from-accent-content via-secondary/100 to-accent shadow-xl text-white w-110">
          <div className="card-body min-h-[250px]">
            <h2 className="card-title text-lg font-semibold">Wallet Balance</h2>
            <div className="text-2xl h-[40px] flex items-center">
                <Balance address={"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"} />
            </div>
            <div className="card-actions justify-end mt-4">
              <WalletInteraction />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletInformation;
