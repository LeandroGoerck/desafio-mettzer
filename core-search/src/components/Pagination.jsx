import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "phosphor-react";
import React from "react";

export default function Pagination(props) {
  const { page, totalHits, handleSearchButton, handleChanges } = props;

  return (
    <div className="h-14 w-full bg-white border-2 flex flex-row justify-center items-center">
      <button className="mx-2" type="button">
        <CaretDoubleLeft size={32} weight="bold" />
      </button>
      <button className="mx-2" type="button">
        <CaretLeft size={32} weight="bold" />
      </button>
      <span className="mx-2">página</span>
      <form onSubmit={handleSearchButton}>
        <input
          className="h-10 w-10 mx-2 border-2 rounded-md"
          type="text"
          name="page"
          value={page}
          onChange={handleChanges}></input>
      </form>
      <span className="mx-2">de</span>
      <span className="mx-2">{totalHits}</span>
      <button className="mx-2" type="button">
        <CaretRight size={32} weight="bold" />
      </button>
      <button className="mx-2" type="button">
        <CaretDoubleRight size={32} weight="bold" />
      </button>
    </div>
  );
}
