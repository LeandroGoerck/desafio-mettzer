import { Star } from "phosphor-react";
import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import api from "../helpers/request";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [form, setFormValue] = useState({
    searchInput: "",
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

  const handleSearchButton = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .get(
        `/search/${form.searchInput}?page=${form.page}&pageSize=10&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((data) => {
        setTotalHits(data.data.totalHits);
        setOutputs(
          data.data.data.map((data) => {
            if (data.description !== null) {
              return {
                id: data._id,
                authors: data._source.authors,
                type: data._type,
                description: data._source.description,
                title: data._source.title,
                urls: data._source.urls,
              };
            } else {
              return false;
            }
          })
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (form.page <= 0) {
      setFormValue((prevState) => ({
        ...prevState,
        page: 1,
      }));
    }
  }, [form.page]);

  useEffect(() => {
    buildFavoriteIdList();
  }, [])
  

  const handlePaginationButton = (calc) => {
    setFormValue((prevState) => ({
      ...prevState,
      page: +prevState.page + calc,
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

    buildFavoriteIdList();
  };

  const buildFavoriteIdList = () => {
    const list = [];
    for (let i = 0; i < localStorage.length; i++) {
      list.push(localStorage.key(i));
    }
    setFavoriteIds(list);
  };

  return (
    <>
      <NavBar />
      <SearchBar
        isLoading={isLoading}
        inputSearch={form.searchInput}
        handleChanges={handleChanges}
        handleSearchButton={handleSearchButton}
      />
      <div className="w-full h-full p-2 flex flex-row justify-center bg-gray-100 ">
        <div className="h-full w-[1020px] flex flex-col  bg-white border-sm">
          {outputs.length > 0 && (
            <Pagination
              page={form.page}
              totalHits={totalHits}
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
                    {favoriteIds.includes(output.id) ? (
                      <Star
                        className="absolute right-0 top-0 m-2 text-yellow-300"
                        size={22}
                        weight="fill"
                      />
                    ) : (
                      <Star
                        className="absolute right-0 top-0 m-2"
                        size={22}
                        weight="thin"
                      />
                    )}
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
