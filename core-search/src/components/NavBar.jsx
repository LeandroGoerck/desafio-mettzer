import React from "react";
import { Clipboard, ClipboardText, ListPlus } from "phosphor-react";

export default function NavBar() {
  return (
    <nav className="bg-az4 flex flex-row h-20 items-center bg-[#F5F5F5] ">
      <div className="h-16">
        <div to="/recipes">
          <img className="h-16 pl-8" src="https://oacore.github.io/content/images/logos/core-api.svg" alt="stw logo"></img>
        </div>
      </div>
      <div className="triangle"></div>
      <div className="h-full w-full flex flex-row items-center justify-around">
        <div to="/recipes">
          <Clipboard className="block md:hidden" size={32} />
          <div className="h-fit text-xl p-5 hidden md:block">PESQUISA</div>
        </div>
        <div to="/ingredients">
          <ClipboardText className="block md:hidden" size={32} />
          <div className="h-fit text-xl p-5 hidden md:block">ARTIGOS</div>
        </div>
        <div to="/create">
          <ListPlus className="block md:hidden" size={32} />
          <div className="h-fit text-xl p-5 hidden md:block">
            JORNAIS
          </div>
        </div>
      </div>
    </nav>
  );
}
