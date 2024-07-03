import React from "react";

export default function FetchTodoLoader() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-2">
      <div className="skeleton h-8 w-24 "></div>
      <div className="flex w-full  flex-col gap-3 p-3 bg-white rounded-md">
        <div className="skeleton h-4 w-1/2 self-center"></div>
        <div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-32 w-full mt-2"></div>
        </div>
        <div className="flex justify-between">
          <div className="skeleton h-4 w-11"></div>
          <div className="skeleton h-4 w-11"></div>
        </div>
      </div>
    </div>
  );
}
