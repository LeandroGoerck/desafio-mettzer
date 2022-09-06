import { Star } from "phosphor-react";
import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";

export default function Favorites() {
  const [outputs, setOutputs] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [form, setFormValue] = useState({
    page: 1,
    totalPages: 1,
  });

  const handleChanges = (e) => {
    let { name, value } = e.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchButton = (e) => {};

  useEffect(() => {
    buildFavoriteList();
  }, [form.page]);

  const handlePaginationButton = (calc) => {

    let nextPage = form.page + calc;

    if (nextPage > form.totalPages) {
      nextPage = form.totalPages;
    } else if (nextPage < 1) {
      nextPage = 1;
    }

    setFormValue((prevState) => ({
      ...prevState,
      page: nextPage,
    }));

  };

  const handleFavoriteButton = (document) => {
    const key = Object.keys(document);
    const value = JSON.stringify(Object.values(document));

    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }

    buildFavoriteList();
  };

  const buildFavoriteList = () => {
    const list = [];
    const fullList = [];
    for (
      let i = (form.page - 1) * 10;
      i < localStorage.length && i < form.page * 10;
      i++
    ) {
      list.push(JSON.parse(localStorage.getItem(localStorage.key(i)))[0]);
    }
    for (let i = 0; i < localStorage.length; i++) {
      fullList.push(localStorage.getItem(localStorage.key(i)));
    }
    setOutputs(list);
    setTotalHits(fullList.length);
    setFormValue((prevState) => ({
      ...prevState,
      totalPages: Math.ceil(fullList.length / 10),
    }));
  };

  return (
    <>
      <NavBar />
      <div className="w-full h-full p-2 flex flex-row justify-center bg-gray-100 ">
        <div className="h-full w-[1020px] flex flex-col  bg-white border-sm">
          {outputs.length > 0 && (
            <Pagination
              page={form.page}
              totalHits={totalHits}
              totalPages={form.totalPages}
              handleChanges={handleChanges}
              handleSearchButton={handleSearchButton}
              handlePaginationButton={handlePaginationButton}
            />
          )}

          <div className="h-full w-full">
            {outputs.length > 0 &&
              outputs.map((output, index) => (
                <div
                  className="p-4 m-2 relative border"
                  key={`${index}_${output.id}`}>
                  <button
                    type="button"
                    onClick={() =>
                      handleFavoriteButton({ [output.id]: output })
                    }>
                    <Star
                      className="absolute right-0 top-0 m-2 text-yellow-300"
                      size={22}
                      weight="fill"
                    />
                  </button>
                  <div className="text-green-700">
                    {`${output.authors}`.substring(0, 100) + "..."}
                  </div>
                  <div>{output.type}</div>
                  <div className="text-[#B7540A] my-2">{output.title}</div>
                  <div>{`${output.description}`.substring(0, 200) + "..."}</div>
                  <a
                    className="text-blue-700 my-2 h-20 w-40"
                    href={output.urls}
                    content={output.title}
                    target="_blank"
                    rel="noopener noreferrer">
                    {`${output.urls}`.substring(0, 100) + "..."}
                  </a>
                </div>
              ))}
          </div>

          {outputs.length > 0 && (
            <Pagination
              page={form.page}
              totalHits={totalHits}
              handleChanges={handleChanges}
              handleSearchButton={handleSearchButton}
              handlePaginationButton={handlePaginationButton}
            />
          )}
        </div>
      </div>
    </>
  );
}
