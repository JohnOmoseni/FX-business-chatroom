const ListRow = ({ handleRowClick, renderColumn, containerClass }) => (
  <li
    className={`${containerClass} w-full group py-2.5 px-3 rounded-md grid grid-cols-list gap-4 items-center bg-white hover:bg-lime-100 transition-colors shadow-sm border border-solid border-br-light cursor-pointer`}
    onClick={handleRowClick}
  >
    <div className="relative w-[45px] h-[45px] rounded-[50%] border border-solid border-neutral-200 ">
      <img
        src=""
        alt=""
        className="group-hover:scale-105 transition overflow-hidden"
      />
    </div>

    <div className="flex-column gap-1 w-full">
      <h4 className="font-semibold tracking-tight leading-5 truncate">
        Some title
      </h4>
      <p className="text-sm truncate">some text</p>
    </div>

    {renderColumn()}
  </li>
);

export default ListRow;
