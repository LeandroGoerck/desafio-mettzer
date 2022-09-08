import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import RouterWrapper from "./RouterWrapper";

describe("Test Home", () => {
  it("should have the correct elements", () => {
    render(<Home />, { wrapper: RouterWrapper });

    // const logo = screen.getAllByAltText(/logo/);
    const favoritesButton = screen.getByText(/FAVORITOS/i);
    const searchButton = screen.getByText(/PESQUISA/i);
    const searchInput = screen.getByPlaceholderText(
      /O que você está buscando/i
    );

    expect(favoritesButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
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
});
