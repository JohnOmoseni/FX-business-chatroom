import { useSelector } from "react-redux";

function FxItem({ fxSymbol, fxRate, onClick }) {
  const { baseCurrency } = useSelector((state) => state.fxState);
  const rate = parseInt(fxRate).toFixed(2);
  const symbol = fxSymbol;

  return (
    <li
      className="group w-full py-3 px-2 pr-3 rounded-md grid grid-cols-list gap-2 items-center bg-white hover:bg-emerald-500 transition-colors shadow-md border border-solid border-br-light cursor-pointer"
      onClick={() => onClick(rate, symbol)}
    >
      <div className="relative w-[30px] h-[30px] rounded-[50%] border border-solid border-neutral-200 ">
        <img src="" alt="" />
      </div>

      <h4 className="font-semibold text-shadow tracking-tight leading-5 text-neutral-500 truncate group-hover:text-white">
        {symbol}/{baseCurrency}
      </h4>
      <span className="text-neutral-500 text-base font-semibold text-shadow group-hover:text-white">
        {rate}
      </span>
    </li>
  );
}
export default FxItem;
