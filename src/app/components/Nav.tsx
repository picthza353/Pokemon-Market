import React, { FC } from "react";
import Search from "./Search";
import { FiShoppingBag } from "react-icons/fi";
import { Data } from "../page";

interface NavProps {
  title: string;
  onCartClick: () => void;
  cartItemCount: number;
  onSearch: (data: Data[], notFound: boolean) => void;
  originalData: Data[];
}

const Nav: FC<NavProps> = ({
  title,
  onCartClick,
  cartItemCount,
  onSearch,
  originalData,
}) => {
  return (
    <div className="flex flex-col pb-6 sm:flex-row w-full border-slate-700 border-b mb-6">
      <div className="flex justify-between items-center mb-4 sm:mb-0 sm:w-auto">
        <h1 className="text-[26px] font-semibold text-white leading-[36.4px]">
          {title}
        </h1>
        <div className="flex sm:hidden">
          <button
            onClick={onCartClick}
            className="flex relative p-2 bg-orange rounded-[6px] hover:bg-[#D76D5A] h-11 w-11 items-center justify-center shadow-[0px_8px_24px_0px_#EA7C694D]"
          >
            <FiShoppingBag className="text-white text-[22px]" />
            {cartItemCount > 0 && (
              <span className="absolute top-[-5px] right-[-5px] block h-4 w-4 text-xs rounded-full bg-white text-orange">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center sm:flex-grow sm:justify-end sm:space-x-4">
        <Search onSearch={onSearch} originalData={originalData} />
        <div className="hidden sm:flex">
          <button
            onClick={onCartClick}
            className="flex relative p-2 bg-orange rounded-[6px] hover:bg-[#D76D5A] h-11 w-11 items-center justify-center shadow-[0px_8px_24px_0px_#EA7C694D]"
          >
            <FiShoppingBag className="text-white text-[22px]" />
            {cartItemCount > 0 && (
              <span className="absolute top-[-5px] right-[-5px] block h-4 w-4 text-xs rounded-full bg-white text-orange">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
