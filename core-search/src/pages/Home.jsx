import React, { useState } from "react";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import api from "../helpers/request";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [form, setFormValue] = useState({
    searchInput: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchButton = () => {
    api
      .get(
        `/search/${form.searchInput}?page=1&pageSize=10&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((data) => {
        console.log(data.data.data);
        setArticles(
          data.data.data.map((data) => ({
            id: data._id,
            authors: `${data._source.authors}`.substring(0, 100) + "...",
            type: data._type,
            description:
              `${data._source.description}`.substring(0, 200) + "...",
            title: data._source.title,
            urls: data._source.urls,
          }))
        );
        // setArticles(data.data)
      });
  };

  return (
    <>
      <NavBar />
      <SearchBar
        inputSearch={form.searchInput}
        handleChanges={handleChanges}
        handleSearchButton={handleSearchButton}
      />
      <div className="w-full h-screen p-2 flex flex-row justify-center bg-[#F5F5F5] ">
        <div className="h-full w-[1020px] flex flex-col  bg-white border-sm">
          <div className="h-full w-full">
            {articles.length > 0 &&
              articles.map((article, index) => (
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
        </div>
      </div>
    </>
  );
}
