import React from "react";
import { FileSearch, Star } from "phosphor-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-az4 flex flex-row h-20 justify-between items-center bg-[#F5F5F5] ">
      <div className="h-16 w-fit">
        <Link className="flex flex-row" to="/home">
          <img
            className="h-16 w-60 pl-8"
            src="/logo_mettzer.png"
            alt="mettzer logo"></img>
          <img
            className="h-16 w-60 pl-8 hidden md:block"
            src="https://oacore.github.io/content/images/logos/core-api.svg"
            alt="stw logo"></img>
        </Link>
      </div>
      <div className="h-full w-fit flex flex-row items-center justify-around">
        <Link to="/home">
          <FileSearch className="inline-block md:hidden mx-4" size={32} />
          <div className="h-fit text-xl p-5 hidden md:block">PESQUISA</div>
        </Link>
        <Link to="/favorites">
          <Star className="inline-block  md:hidden mx-4" size={32} />
          <div className="h-fit text-xl p-5 hidden md:block">FAVORITOS</div>
        </Link>
      </div>
    </nav>
  );
}
