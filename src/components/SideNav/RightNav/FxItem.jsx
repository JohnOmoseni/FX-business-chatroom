import { useSelector } from "react-redux";

function FxItem({ fxSymbol, fxRate, onClick }) {
  const { baseCurrency } = useSelector((state) => state.fxState);
  const rate = parseInt(fxRate).toFixed(2);
  const symbol = fxSymbol;

  return (
    <li
      className="group w-full py-4 px-2 pr-3 rounded-md flex-row gap-2 !justify-between bg-white hover:bg-emerald-500 transition-colors shadow-md border border-solid border-br-light cursor-pointer"
      onClick={() => onClick(rate, symbol)}
    >
      <h4 className="font-semibold flex-1 text-shadow tracking-tight leading-5 text-neutral-800 truncate group-hover:text-white">
        {symbol}/{baseCurrency}
      </h4>
      <p className="text-neutral-500 text-base font-semibold text-shadow group-hover:text-white">
        {rate}
      </p>
    </li>
  );
}
export default FxItem;
