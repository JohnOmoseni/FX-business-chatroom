import { PulseSpinner } from "react-spinners-kit";

function LoaderBody({ isIcon }) {
  const icon = isIcon ? isIcon : <PulseSpinner size={30} color="#11f889" />;

  return (
    <div className="w-full h-100dvh fixed top-0 left-0 grid place-items-center bg-inherit">
      <div className="flex-column !items-center gap-3">
        {icon}
        <span className="text-sm text-shadow tracking-wide font-kinn">
          Loading....
        </span>
      </div>
    </div>
  );
}
export default LoaderBody;
