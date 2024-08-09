import { useState, useEffect, FC, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { Data } from "../page";

interface SearchProps {
  onSearch: (data: Data[], notFound: boolean) => void;
  originalData: Data[];
}

const Search: FC<SearchProps> = ({ onSearch, originalData }) => {
  const [search, setSearch] = useState("");

  const fetchSearchResults = useCallback(
    async (searchName: string) => {
      if (searchName.trim()) {
        try {
          const response = await axios.get(
            `https://api.pokemontcg.io/v2/cards?q=name:${searchName}`
          );
          const results = response.data.data;
          if (results.length > 0) {
            onSearch(results, false);
          } else {
            onSearch([], true);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
          onSearch([], true);
        }
      } else {
        onSearch(originalData, false);
      }
    },
    [onSearch, originalData]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSearchResults(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search, fetchSearchResults]);

  const clearSearch = () => {
    setSearch("");
    onSearch(originalData, false);
  };

  return (
    <div className="flex flex-col gap-2 w-full sm:w-48">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 pl-10 border border-gray-600 rounded-lg w-full bg-[#252734] text-white focus:bg-[#242633]"
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <IoSearch className="text-white text-xl" />
        </div>
        {search && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-3 flex items-center text-white"
          >
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
