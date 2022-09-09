import Favorites from "../pages/Favorites";
import { render, screen } from "@testing-library/react";
import RouterWrapper from "./RouterWrapper";

const item1 = [
  {
    id: "199341388",
    type: "article",
    authors: ["Souza, Alexandre de"],
    description:
      "Orientador:  Jaime WojciechowskiMonografia (graduação) - Universidade Federal do Paraná, Setor de Educação Profissional e Tecnológica, Curso de Tecnologia em Análise e Desenvolvimento de Sistemas",
    title: "O Formatador: ferramenta para formatação de trabalhos",
    urls: ["https://hdl.handle.net/1884/56632"],
  },
];

const item2 = [
  {
    id: "276548993",
    type: "article",
    authors: ["Mariotto, Geovane"],
    description:
      "Este trabalho tem como tema principal o estudo sobre o sensoriamento remoto no uso e ocupação do solo por meios de alvos agrícolas na interpretação de imagens de satélites orbitais. O objetivo deste trabalho é compreender o uso do solo e a classificação temporal dos alvos agrícolas cultivados em um limite de espaço localizado no município de Pindorama (SP). Os materiais e métodos aplicados para o desenvolvimento deste trabalho foram a utilização de imagens orbitais do satélite Sentinel-2 com objetivos temporal dentre análise da paisagem, solo e mudanças territoriais. Os resultados obtidos foram uma série de dados temporais que se submeteram análise criteriosa, resultando a sim na dinâmica da paisagem e no antropocentrismo das relações homem-natureza e ocupação. Os resultados deste trabalho contribuem para uma análise geoespacial. ",
    title:
      "A utilização do sensoriamento remoto como ferramenta aplicado no cultivo de cana de açúcar no município de Pindorama no estado de São Paulo / The use of remote sensing as a tool applied in sugar cane crop in Pindorama city in the state of São Paulo",
    urls: ["http://www.brazilianjournals.com/index.php/BRJD/article/view/5589"],
  },
];

describe("Test Favorites", () => {
  let localStore;

  beforeEach(() => {
    localStore = {};

    jest
      .fn(window.localStorage, "getItem")
      .mockImplementation((key) =>
        key in localStore ? localStore[key] : null
      );

    jest
      .fn(window.localStorage, "setItem")
      .mockImplementation((key, value) => (localStore[key] = value + ""));
    jest
      .fn(window.localStorage, "clear")
      .mockImplementation(() => (localStore = {}));
  });

  localStorage.setItem("199341388", JSON.stringify(item1));
  localStorage.setItem("276548993", JSON.stringify(item2));

  const storedItem1 = JSON.parse(localStorage.getItem("199341388"));
  const storedItem2 = JSON.parse(localStorage.getItem("276548993"));

  expect(storedItem1).toStrictEqual([
    {
      authors: ["Souza, Alexandre de"],
      description:
        "Orientador:  Jaime WojciechowskiMonografia (graduação) - Universidade Federal do Paraná, Setor de Educação Profissional e Tecnológica, Curso de Tecnologia em Análise e Desenvolvimento de Sistemas",
      id: "199341388",
      title: "O Formatador: ferramenta para formatação de trabalhos",
      type: "article",
      urls: ["https://hdl.handle.net/1884/56632"],
    },
  ]);

  expect(storedItem2).toStrictEqual([
    {
      authors: ["Mariotto, Geovane"],
      description:
        "Este trabalho tem como tema principal o estudo sobre o sensoriamento remoto no uso e ocupação do solo por meios de alvos agrícolas na interpretação de imagens de satélites orbitais. O objetivo deste trabalho é compreender o uso do solo e a classificação temporal dos alvos agrícolas cultivados em um limite de espaço localizado no município de Pindorama (SP). Os materiais e métodos aplicados para o desenvolvimento deste trabalho foram a utilização de imagens orbitais do satélite Sentinel-2 com objetivos temporal dentre análise da paisagem, solo e mudanças territoriais. Os resultados obtidos foram uma série de dados temporais que se submeteram análise criteriosa, resultando a sim na dinâmica da paisagem e no antropocentrismo das relações homem-natureza e ocupação. Os resultados deste trabalho contribuem para uma análise geoespacial. ",
      id: "276548993",
      title:
        "A utilização do sensoriamento remoto como ferramenta aplicado no cultivo de cana de açúcar no município de Pindorama no estado de São Paulo / The use of remote sensing as a tool applied in sugar cane crop in Pindorama city in the state of São Paulo",
      type: "article",
      urls: [
        "http://www.brazilianjournals.com/index.php/BRJD/article/view/5589",
      ],
    },
  ]);

  it("should display the results when the page opens", async () => {
    render(<Favorites />, { wrapper: RouterWrapper });

    const titles = await screen.findAllByTestId(/title-/);
    const authors = await screen.findAllByTestId(/authors-/);

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

  it("should display the pagination when the page opens", async () => {
    render(<Favorites />, { wrapper: RouterWrapper });

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

    expect(paginationDecrement100).toHaveLength(2);
    expect(paginationDecrement1).toHaveLength(2);
    expect(paginationInputCurrentPage).toHaveLength(2);
    expect(paginationTotalPages).toHaveLength(2);
    expect(paginationIncrement100).toHaveLength(2);
    expect(paginationIncrement1).toHaveLength(2);
  });
});
