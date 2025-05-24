import { Balance } from "../scaffold-eth/Balance";
import { WalletInteraction } from "~~/components/import";
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
          address={"0x0AAD784EB328eDf8b8fAF1c7416C3dbFD1605e0A"}
          render={({ isError }) => {
            let bgClasses = "bg-white pulse-size";
            if (isError) {
              bgClasses = "bg-red-500 opacity-50 transition-all scale-[1.4]";
            }

            return (
              <>
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <div className={`w-[300px] h-[300px] rounded-full ${bgClasses} opacity-10`}></div>
                </div>
              </>
            );
          }}
        />
        <div className="card bg-gradient-to-r from-accent-content via-secondary/100 to-accent shadow-xl text-white w-110">
          <div className="card-body min-h-[250px]">
            <h2 className="card-title text-lg font-semibold opacity-80 tracking-wide">Wallet Balance</h2>
            <div className="tooltip tooltip-left" data-tip="Click to change currency">
              <Balance address={"0x0AAD784EB328eDf8b8fAF1c7416C3dbFD1605e0A"} />
            </div>
            <div className="card-actions justify-end mt-auto">
              <WalletInteraction />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletInformation;
