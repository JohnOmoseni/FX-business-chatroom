export const ListGeneric = ({ list, render, containerClass, listClass }) => {
  return (
    <ul className={`${containerClass}`}>
      {list?.map((item, idx) => {
        <li key={idx} className={`${listClass}`}>
          {render(item)}
        </li>;
      })}
    </ul>
  );
};
