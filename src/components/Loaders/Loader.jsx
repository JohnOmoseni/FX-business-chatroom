import { PulseSpinner } from "react-spinners-kit";

function Loader({ isLoading, isIcon }) {
  const icon = isIcon ? (
    isIcon
  ) : (
    <PulseSpinner size={30} color="#11f889" loading={isLoading} />
  );

  return (
    <div className="w-full min-h-[50vh] flex-1 grid place-items-center bg-inherit">
      <div className="flex-column !items-center gap-3">
        {icon}
        <span className="text-sm text-shadow tracking-wide font-kinn">
          Loading....
        </span>
      </div>
    </div>
  );
}
export default Loader;
