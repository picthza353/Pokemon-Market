/* eslint-disable @next/next/no-img-element */
import { FiShoppingBag } from "react-icons/fi";
import { Data } from "../page";

interface CardProps {
  item: Data;
  handleAddToCart: (item: Data) => void;
}

export default function Card({ item, handleAddToCart }: CardProps) {
  return (
    <div className="relative overflow-hidden flex flex-col items-center h-[405px] sm:h-[245px] lg:h-[260px] 2xl:h-[295px]">
      <div className="relative top-[-15px] p-4 h-auto z-20">
        <img
          src={item.images.small}
          alt={item.name}
          className="w-[200px] object-contain sm:w-[90px] lg:w-[100px] 2xl:w-[120px]"
        />
      </div>
      <div className="relative top-[-80px] text-center p-6 pt-12 bg-bgCard rounded-lg w-full z-10 sm:p-4 sm:pt-12">
        <h3 className="text-[12px] text-white mt-4 mb-2 sm:text-[10px] sm:h-9 sm:mb-0 2xl:text-[12px]">
          {item.name}
        </h3>
        <div className="flex justify-center">
          {item.cardmarket?.prices?.averageSellPrice !== undefined ? (
            <p className="text-textPrice text-[12px] sm:text-[10px] 2xl:text-[12px]">
              $ {item.cardmarket.prices.averageSellPrice.toFixed(2)}
            </p>
          ) : (
            <p className="text-textPrice text-[12px] mb-2 sm:text-[10px] sm:mb-0 2xl:text-[12px]">
              Undifined
            </p>
          )}
          <div className="dot my-auto mx-2"></div>
          {item.set.total === 0 ? (
            <p className="text-textPrice text-[12px] sm:text-[10px] 2xl:text-[12px]">
              Out of stock
            </p>
          ) : (
            <p className="text-textPrice text-[12px] sm:text-[10px] 2xl:text-[12px]">
              {item.set.total} Cards
            </p>
          )}
        </div>
        <button
          onClick={() => handleAddToCart(item)}
          className={`flex justify-center items-center text-center gap-2 mt-1  py-2 bg-[#312F3B] font-medium text-white text-[12px] rounded-lg hover:bg-[#474650] w-full sm:text-[10px] 2xl:text-[12px] ${
            item.set.total === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={item.set.total === 0}
        >
          <FiShoppingBag className="text-white text-[14px] sm:text-[14px] lg:text-[16px] 2xl:text-[14px]" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
