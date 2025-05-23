import { useGlobalState } from "~~/services/store/store";

const WalletToggle = ({ className }: { className?: string }) => {
  const walletInfo = useGlobalState(state => state.walletInfo);

  return (
    <div className={`bg-base-100 border-base-300 collapse border ${className ?? ""}`}>
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        How do I create an account?
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        Click the;Sign Up button in the top right corner and follow the registration process.
      </div>
    </div>
  );
};

export default WalletToggle;
