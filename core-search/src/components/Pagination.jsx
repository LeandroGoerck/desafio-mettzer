import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "phosphor-react";
import React from "react";

export default function Pagination(props) {
  const {
    currentPage,
    totalHits,
    handleSearchButton,
    handleChanges,
    handlePaginationButton,
    totalPages,
  } = props;

  return (
    <div className="h-14 w-full bg-white border-2 flex flex-row justify-center items-center">
      <span
        data-testid="totalHits" 
        className="mx-2">Total de resultados: {totalHits}</span>
      <button
        data-testid="pagination_decrement100"
        className="mx-2"
        type="button"
        onClick={() => handlePaginationButton(-100)}>
        <CaretDoubleLeft size={32} weight="bold" />
      </button>
      <button
        data-testid="pagination_decrement1"
        className="mx-2"
        type="button"
        onClick={() => handlePaginationButton(-1)}>
        <CaretLeft size={32} weight="bold" />
      </button>
      <span className="mx-2">página</span>
      <form onSubmit={handleSearchButton}>
        <input
          data-testid="pagination_inputCurrentPage"
          className="h-10 w-10 mx-2 border-2 rounded-md"
          type="text"
          name="currentPage"
          value={currentPage}
          onChange={handleChanges}></input>
      </form>
      <span className="mx-2">de</span>
      <span data-testid="pagination_totalPages" className="mx-2">{totalPages}</span>
      <button
        data-testid="pagination_increment1"
        className="mx-2"
        type="button"
        onClick={() => handlePaginationButton(+1)}>
        <CaretRight size={32} weight="bold" />
      </button>
      <button
        data-testid="pagination_increment100"
        className="mx-2"
        type="button"
        onClick={() => handlePaginationButton(+100)}>
        <CaretDoubleRight size={32} weight="bold" />
      </button>
    </div>
  );
}
