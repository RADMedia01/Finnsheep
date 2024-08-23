"use client";

import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { useState } from 'react';

const SuperSearch = ({ initialTutors }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(initialTutors);
  const [page, setPage] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.length > 2) {
      try {
        const response = await fetch(`/api/search?q=${query}&page=${page}`);
        const { tutors } = await response.json();
        setResults(tutors);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative right-0 justify-end">
      <form onSubmit={handleSearch} className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IoIosSearch className="text-lg" />
        </div>
        <Input
          id="search"
          className="block w-48 lg:w-72 pl-10 py-2 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="hidden">Search</button>
      </form>
      <div className="mt-4">
        {results.length > 0 ? (
          results.map((tutor) => (
            <div key={tutor._id} className="p-4 border-b">
              <h2 className="text-xl font-bold">{tutor.name}</h2>
              <p>{tutor.bio}</p>
              <p>{tutor.subjects.join(", ")}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SuperSearch;
