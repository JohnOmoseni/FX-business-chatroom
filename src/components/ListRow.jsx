const ListRow = ({
  handleRowClick,
  renderLastCol,
  containerClass,
  obj,
  showImg,
}) => (
  <li
    className={`${containerClass} w-full group py-4 px-4 md:py-3 rounded-md grid ${
      showImg ? "grid-cols-list" : "grid-cols-two"
    } gap-3 items-center bg-white hover:bg-lime-100 transition-colors shadow-sm border border-solid border-br-light cursor-pointer`}
    onClick={handleRowClick}
  >
    {showImg && (
      <div className="relative w-[30px] h-[30px] rounded-[50%] border border-solid border-neutral-200 ">
        <img
          src={obj?.avatar}
          alt=""
          className="group-hover:scale-105 transition overflow-hidden"
        />
      </div>
    )}

    <div className="flex-column gap-1 w-full">
      <h4 className="font-semibold tracking-tight leading-5 truncate">
        {obj?.name}
      </h4>
      <p className="text-sm truncate">{obj?.subtitle}</p>
    </div>

    {renderLastCol()}
  </li>
);

export default ListRow;
