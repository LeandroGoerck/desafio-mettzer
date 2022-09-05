import React from "react";
import { MagnifyingGlass } from "phosphor-react";

export default function SearchBar(props) {
  const { searchInput, handleChanges, handleSearchButton } = props;
  return (
    <div className="h-20 w-full flex flex-row p-4">
      <div className="h-full w-full flex flex-col justify-center bg-[#F5F5F5]">
        <div className="h-full flex flex-row justify-center">
          <input
            title="O que você está buscando?"
            type="text"
            name="searchInput"
            placeholder="O que você está buscando?"
            value={searchInput}
            onChange={handleChanges}
            className="h-full w-full rounded-sm pl-1 border"
          />
          <button
            className="h-12 w-12 flex flex-row justify-center items-center rounded-sm bg-[#B7540A] "
            type="button"
            onClick={handleSearchButton}>
            <MagnifyingGlass className="text-white" weight="bold" size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
