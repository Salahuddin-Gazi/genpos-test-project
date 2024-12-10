"use client";

import { useState, ChangeEvent } from "react";
import { SearchMdIcon, CommandIcon } from "./icons";

export default function SearchYourPage() {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex justify-start items-center gap-x-1 p-2 border w-full max-w-[450px] rounded-md shadow-sm">
      <SearchMdIcon className="h-4 w-4" />
      <input
        className="text-sm w-[calc(100%-35px)] p-1 focus:outline-none focus:ring-0"
        placeholder="Search your page..."
        value={searchText}
        type="text"
        onChange={handleSearch}
      />
      <div className="py-1 px-2 bg-blue-500 text-white flex text-base justify-start items-center rounded-lg">
        <CommandIcon className="h-4 w-4" /><span className="text-sm font-bold">K</span>
      </div>
    </div>
  );
}
