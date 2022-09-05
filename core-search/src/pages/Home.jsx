import React, { useState } from "react";

import NavBar from "../components/NavBar";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import api from "../helpers/request";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [form, setFormValue] = useState({
    searchInput: "",
    page: 1,
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
        console.log(data.data);
        setTotalHits(data.data.totalHits);
        setOutputs(
          data.data.data.map((data) => {
            if (data.description !== null) {
              return {
                id: data._id,
                authors: `${data._source.authors}`.substring(0, 100) + "...",
                type: data._type,
                description:
                  `${data._source.description}`.substring(0, 200) + "...",
                title: data._source.title,
                urls: `${data._source.urls}`.substring(0, 100) + "...",
              };
            } else {
              return false;
            }
          })
        );
        setIsLoading(false);
        // setArticles(data.data)
      });
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
            />
          )}

          <div className="h-full w-full">
            {outputs.length > 0 &&
              outputs.map((article, index) => (
                <div className="p-4 m-2" key={`${index}_${article.id}`}>
                  <div className="text-green-700">{article.authors}</div>
                  <div>{article.type}</div>
                  <div className="text-[#B7540A] my-2">{article.title}</div>
                  <div>{article.description}</div>
                  <a
                    className="text-blue-700 my-2 h-20 w-40"
                    href={article.urls}
                    content={article.title}
                    target="_blank"
                    rel="noopener noreferrer">
                    {article.urls}
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
            />
          )}
        </div>
      </div>
    </>
  );
}
