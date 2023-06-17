import React, { createContext, useState } from "react";
import { useNotification } from "../hooks/index";

export const searchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const SearchProvider = ({ children }) => {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const updateNotification = useNotification();

  const search = async (method, query, updaterFunc) => {
    const { type, response } = await method(query);
    setSearching(false);
    if (type === "error") return updateNotification(type, response);
    if (!response.length) {
      setResults([]);
      updaterFunc && updaterFunc([]);
      return setNotFound(true);
    }

    setNotFound(false);
    setResults(response);
    updaterFunc && updaterFunc([...response]);
  };

  const debounceFunc = debounce(search, 300);

  const handleSearch = (method, query, updaterFunc) => {
    setSearching(true);
    if (!query.trim()) {
      updaterFunc && updaterFunc([]);
      resetSearch();
    }
    debounceFunc(method, query, updaterFunc);
  };

  const resetSearch = () => {
    setSearching(false);
    setResults([]);
    setNotFound(false);
  };

  return (
    <searchContext.Provider
      value={{ handleSearch, searching, results, notFound, resetSearch }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchProvider;
