function SideLayout({ children, right }) {
  return (
    <div
      className={`${
        right ? "hidden md:block" : "flex-column"
      } relative h-screen gap-4 py-6 px-4 md:p-[6%] pb-0 !justify-start border border-solid border-br-light shadow-sm`}
    >
      {children}
      <div className="w-full -z-10 mask-gradient absolute top-[50%] left-0 right-0 bottom-0"></div>
    </div>
  );
}
export default SideLayout;
