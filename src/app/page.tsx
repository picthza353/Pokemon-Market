/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Cart from "./components/Cart";
import Pagination from "./components/Pagination";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineCatchingPokemon } from "react-icons/md";

export interface Data {
  id: string;
  name: string;
  cardmarket?: {
    prices?: {
      averageSellPrice?: number;
    };
  };
  set: {
    id: string;
    name: string;
    total: number;
  };
  rarity: string;
  types: string[];
  images: {
    small: string;
  };
}

export interface CartItem {
  card: Data;
  quantity: number;
}

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sets, setSets] = useState<{ id: string; name: string }[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedSet, setSelectedSet] = useState<string>("");
  const [selectedRarity, setSelectedRarity] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [search, setSearch] = useState<Data[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.pokemontcg.io/v2/cards");
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await axios.get("https://api.pokemontcg.io/v2/sets");
        setSets(response.data.data);
      } catch (error) {
        console.error("Error fetching sets:", error);
      }
    };

    fetchSets();
  }, []);

  useEffect(() => {
    const fetchRarities = async () => {
      try {
        const response = await axios.get(
          "https://api.pokemontcg.io/v2/rarities"
        );
        setRarities(response.data.data);
      } catch (error) {
        console.error("Error fetching rarities:", error);
      }
    };

    fetchRarities();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("https://api.pokemontcg.io/v2/types");
        setTypes(response.data.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    let newFilteredData = search.length > 0 ? search : data;

    if (selectedSet) {
      newFilteredData = newFilteredData.filter(
        (card) => card.set.id === selectedSet
      );
      setCurrentPage(1);
    }

    if (selectedRarity) {
      newFilteredData = newFilteredData.filter(
        (card) => card.rarity === selectedRarity
      );
      setCurrentPage(1);
    }

    if (selectedType) {
      newFilteredData = newFilteredData.filter((card) =>
        card.types.includes(selectedType)
      );
      setCurrentPage(1);
    }

    setFilteredData(newFilteredData);
  }, [selectedSet, selectedRarity, selectedType, search, data]);

  const handleSearch = (results: Data[], notFoundStatus: boolean) => {
    setSearch(results);
    setNotFound(notFoundStatus);
  };

  const handleAddToCart = (card: Data) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.card.id === card.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.card.id === card.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { card, quantity: 1 }];
    });
  };

  const handleUpdateCart = (card: Data, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.card.id === card.id ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const clearSet = () => setSelectedSet("");
  const clearRarity = () => setSelectedRarity("");
  const clearType = () => setSelectedType("");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center space-x-2">
          <MdOutlineCatchingPokemon className="animate-spin h-8 w-8 text-red-500 bg-white rounded-full" />
          <span className="text-xl text-white font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="flex justify-center items-center relative">
      <div className="relative top-6 w-[90%] sm:w-4/5">
        <Nav
          title="Pokemon market"
          onCartClick={toggleCartVisibility}
          cartItemCount={cartItems.length}
          onSearch={handleSearch}
          originalData={data}
        />
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex justify-start items-center">
            <p className="text-[18px] text-white font-semibold">Choose Card</p>
          </div>

          <div className=" flex justify-between space-x-2 sm:justify-end">
            <div className="relative flex items-center">
              <select
                className="bg-bgCard text-white py-2 px-4 rounded-lg appearance-none pr-12 w-24 border border-[#393C49] focus:outline-none sm:w-28"
                value={selectedSet}
                onChange={(e) => setSelectedSet(e.target.value)}
              >
                <option value="" hidden>
                  Set
                </option>
                {sets.map((set) => (
                  <option
                    key={set.id}
                    value={set.id}
                    className="py-4 px-8 rounded-lg bg-bgCard text-white border border-[#393C49] hover:bg-[#2E303E]"
                  >
                    {set.name}
                  </option>
                ))}
              </select>
              {selectedSet && (
                <button
                  onClick={clearSet}
                  className="absolute inset-y-0 right-5 flex items-center text-white px-2"
                >
                  &#10005;
                </button>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FaChevronDown className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="relative flex items-center">
              <select
                className="bg-bgCard text-white py-2 px-4 rounded-lg appearance-none pr-11 w-28 border border-[#393C49] focus:outline-none sm:w-28"
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
              >
                <option value="" hidden>
                  Rarity
                </option>
                {rarities.map((rarity) => (
                  <option
                    key={rarity}
                    value={rarity}
                    className="rounded-lg bg-bgCard text-white border border-[#393C49] hover:bg-[#2E303E]"
                  >
                    {rarity}
                  </option>
                ))}
              </select>
              {selectedRarity && (
                <button
                  onClick={clearRarity}
                  className="absolute inset-y-0 right-5 flex items-center text-white px-2"
                >
                  &#10005;
                </button>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FaChevronDown className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="relative flex items-center">
              <select
                className="bg-bgCard text-white py-2 px-4 rounded-lg appearance-none pr-10 w-24 border border-[#393C49] focus:outline-none sm:w-28"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="" hidden>
                  Type
                </option>
                {types.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="rounded-lg bg-bgCard text-white border border-[#393C49] hover:bg-[#2E303E]"
                  >
                    {type}
                  </option>
                ))}
              </select>
              {selectedType && (
                <button
                  onClick={clearType}
                  className="absolute inset-y-0 right-5 flex items-center text-white px-2"
                >
                  &#10005;
                </button>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FaChevronDown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-5 mt-6 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
          {notFound || currentData.length === 0 ? (
            <div className="col-span-6 text-center text-red-500 text-xl">
              No results found.
            </div>
          ) : (
            currentData.map((item) => (
              <Card
                key={item.id}
                item={item}
                handleAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
        {notFound || currentData.length === 0 ? (
          <></>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        )}

        {isCartVisible && (
          <Cart
            cartItems={cartItems}
            onUpdateCart={handleUpdateCart}
            onClearCart={handleClearCart}
            onCloseCart={toggleCartVisibility}
          />
        )}
      </div>
    </main>
  );
}
