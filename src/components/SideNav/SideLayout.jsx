function SideLayout({ children }) {
  return (
    <div className="relative h-screen flex-column gap-4 p-[6%] pb-0 !justify-start border border-solid border-br-light shadow-sm ">
      {children}
      <div className="w-full -z-10 mask-gradient absolute top-[50%] left-0 right-0 bottom-0"></div>
    </div>
  );
}
export default SideLayout;
