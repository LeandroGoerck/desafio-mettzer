import React from "react";
import { MagnifyingGlass, SpinnerGap } from "phosphor-react";

export default function SearchBar(props) {
  const { isLoading, searchInput, handleChanges, handleSearchButton } = props;
  return (
    <div className="h-20 w-full flex flex-row p-4">
      <div className="h-full w-full flex flex-col justify-center bg-[#F5F5F5]">
        <form className="h-full flex flex-row justify-center">
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
            className="h-12 w-12 flex flex-row justify-center items-center rounded-sm bg-[#76E8AB]"
            type="submit"
            onClick={(e) => handleSearchButton(e)}>
            {isLoading ? (
              <SpinnerGap className="animate-spin text-white" size={32} weight="bold" />
            ) : (
              <MagnifyingGlass className="text-white" weight="bold" size={32} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
