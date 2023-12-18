const ListRow = ({ handleRowClick, renderLastCol, containerClass, obj }) => (
  <li
    className={`${containerClass} w-full group py-4 px-3 md:py-2 rounded-md grid grid-cols-list gap-3 items-center bg-white hover:bg-lime-100 transition-colors shadow-sm border border-solid border-br-light cursor-pointer`}
    onClick={handleRowClick}
  >
    <div className="relative w-[30px] h-[30px] rounded-[50%] border border-solid border-neutral-200 ">
      <img
        src={obj?.avatar}
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

    {renderLastCol()}
  </li>
);

export default ListRow;
