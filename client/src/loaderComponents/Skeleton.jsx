export default function Skeleton() {
  return (
    <div className="flex  flex-col gap-4 md:gap-2 w-screen max-w-[900px] my-10 border border-slate-400">
      <div className="skeleton h-9 w-full"></div>
      <div className="skeleton h-4 md:hidden w-28"></div>
      <div className="skeleton h-4 md:hidden w-full"></div>
      <div className="skeleton h-4 md:hidden w-full"></div>
      <div className="skeleton h-4 md:hidden w-20"></div>
      <div className="self-end skeleton h-4 md:hidden w-40"></div>
      <div className="hidden md:flex flex-row gap-x-5 m-2">
        <div className="skeleton flex-1 h-5 "></div>
        <div className="skeleton flex-1 h-5 "></div>
        <div className="skeleton flex-1 h-5 "></div>
        <div className="skeleton flex-1 h-5 "></div>
      </div>
      <div className="hidden md:flex flex-row gap-x-5 m-2">
        <div className="skeleton flex-1 h-5 "></div>
        <div className="skeleton flex-1 h-5 "></div>
        <div className="skeleton flex-1 h-5 "></div>
        <div className="skeleton flex-1 h-5 "></div>
      </div>
    </div>
  );
}
