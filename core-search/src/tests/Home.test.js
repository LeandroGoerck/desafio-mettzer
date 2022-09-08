import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import RouterWrapper from "./RouterWrapper";
import mockAxios from "axios";
import { metzzerMock } from "./mettzerMock";

describe("Test Home", () => {
  it("should have the correct elements", () => {
    render(<Home />, { wrapper: RouterWrapper });

    const goToFavoritesButton = screen.getByText(/FAVORITOS/i);
    const goToSearchButton = screen.getByText(/PESQUISA/i);
    const searchInput = screen.getByTestId("searchInput");
    const searchButton = screen.getByTestId("searchButton");

    expect(goToFavoritesButton).toBeInTheDocument();
    expect(goToSearchButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("should be possible to write in search field", () => {
    render(<Home />, { wrapper: RouterWrapper });

    const searchInput = screen.getByPlaceholderText(
      /O que você está buscando/i
    );
    fireEvent.change(searchInput, { target: { value: "mettzer" } });

    expect(searchInput.value).toBe("mettzer");
  });

  it("should be possible to clear the search field", () => {
    render(<Home />, { wrapper: RouterWrapper });

    const searchInput = screen.getByPlaceholderText(
      /O que você está buscando/i
    );
    fireEvent.change(searchInput, { target: { value: "" } });

    expect(searchInput.value).toBe("");
  });

  it("should display the results when click the search button", async () => {
    render(<Home />, { wrapper: RouterWrapper });

    await mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(metzzerMock)
    );
    const searchButton = screen.getByTestId("searchButton");

    fireEvent.click(searchButton);

    const titles = await screen.findAllByTestId(/title-/);
    const authors = await screen.findAllByTestId(/authors-/);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    expect(titles).toHaveLength(2);
    expect(titles[0].innerHTML).toBe(
      "O Formatador: ferramenta para formatação de trabalhos"
    );
    expect(titles[1].innerHTML).toBe(
      "A utilização do sensoriamento remoto como ferramenta aplicado no cultivo de cana de açúcar no município de Pindorama no estado de São Paulo / The use of remote sensing as a tool applied in sugar cane crop in Pindorama city in the state of São Paulo"
    );

    expect(authors).toHaveLength(2);
    expect(authors[0].innerHTML).toBe("Souza, Alexandre de...");
    expect(authors[1].innerHTML).toBe("Mariotto, Geovane...");
  });

  it("should display the pagination when click the search button", async () => {
    render(<Home />, { wrapper: RouterWrapper });

    await mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(metzzerMock)
    );
    const searchButton = screen.getByTestId("searchButton");

    fireEvent.click(searchButton);

    const paginationDecrement100 = await screen.findAllByTestId(
      "pagination_decrement100"
    );
    const paginationDecrement1 = await screen.findAllByTestId(
      "pagination_decrement1"
    );
    const paginationInputCurrentPage = await screen.findAllByTestId(
      "pagination_inputCurrentPage"
    );
    const paginationTotalPages = await screen.findAllByTestId(
      "pagination_totalPages"
    );
    const paginationIncrement1 = await screen.findAllByTestId(
      "pagination_increment1"
    );
    const paginationIncrement100 = await screen.findAllByTestId(
      "pagination_increment100"
    );

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(paginationDecrement100).toHaveLength(2);
    expect(paginationDecrement1).toHaveLength(2);
    expect(paginationInputCurrentPage).toHaveLength(2);
    expect(paginationTotalPages).toHaveLength(2);
    expect(paginationIncrement100).toHaveLength(2);
    expect(paginationIncrement1).toHaveLength(2);
  });
});
