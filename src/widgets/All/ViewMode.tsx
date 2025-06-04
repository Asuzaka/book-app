"use client";

import { TbLayoutGrid } from "react-icons/tb";
import { SiMdbook } from "react-icons/si";
import { Dispatch, SetStateAction } from "react";

type ViewMode = "table" | "gallery";

type Props = {
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
  setExpandedIndex: Dispatch<SetStateAction<number | null>>;
};

export function Widget({ viewMode, setViewMode, setExpandedIndex }: Props) {
  return (
    <div className="ml-auto flex items-center gap-1 border rounded border-blue-600  bg-gray-100">
      <button
        onClick={() => {
          setViewMode("gallery");
          setExpandedIndex(null);
        }}
        className={`p-2 rounded cursor-pointer ${
          viewMode === "gallery"
            ? "text-white bg-blue-600"
            : "text-blue-600 bg-white"
        }`}
      >
        <TbLayoutGrid size={16} />
      </button>
      <button
        onClick={() => {
          setViewMode("table");
          setExpandedIndex(null);
        }}
        className={`p-2 rounded cursor-pointer ${
          viewMode === "table"
            ? "text-white bg-blue-600"
            : "text-blue-600 bg-white"
        }`}
      >
        <SiMdbook size={16} />
      </button>
    </div>
  );
}
