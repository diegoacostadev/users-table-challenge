import {SyntheticEvent} from "react";

import useFilters from "../hooks/userFilters";

type SearchBarProps = {
  search: string;
  handleSearch: (e: SyntheticEvent<HTMLInputElement>) => void;
  handleColoredRows: () => void;
  handleOrderedByCountry: () => void;
  restoreToInitialState: () => void;
};

export default function SearchBar({
  search,
  handleSearch,
  handleColoredRows,
  handleOrderedByCountry,
  restoreToInitialState,
}: SearchBarProps) {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Users Table
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0 1rem",
        }}
      >
        <button onClick={handleColoredRows}>Color Rows</button>
        <button onClick={handleOrderedByCountry}>Sort by Country</button>
        <button onClick={restoreToInitialState}>Restore initial state</button>
        <input
          name="search"
          placeholder="Search by country"
          style={{
            marginBottom: 0,
          }}
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </>
  );
}
