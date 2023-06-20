import {useState} from "react";

import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import useFilters from "./hooks/userFilters";
import useUsers from "./hooks/useUsers";

const INITIAL_PAGE = 1;

function App() {
  // const page = 1;
  const [page, setPage] = useState(INITIAL_PAGE);
  const {rawUsers, loading, error} = useUsers({page});

  const {
    handleSort,
    showColoredRows,
    users,
    handleDelete,
    handleColoredRows,
    handleOrderedByCountry,
    handleSearch,
    restoreToInitialState,
    search,
  } = useFilters({usersRef: rawUsers});

  // const users = sorted.slice(initial, end);

  return (
    <>
      <SearchBar
        handleColoredRows={handleColoredRows}
        handleOrderedByCountry={handleOrderedByCountry}
        handleSearch={handleSearch}
        restoreToInitialState={restoreToInitialState}
        search={search}
      />

      {users?.length && (
        <>
          <UserTable
            changeSort={handleSort}
            showColoredRows={showColoredRows}
            users={users}
            onDelete={handleDelete}
          />
        </>
      )}
      {page}
      <button onClick={() => setPage(page + 1)}>Load more</button>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>There was an error.</p>}
      {!loading && !error && users?.length == 0 && <p>No users found.</p>}
    </>
  );
}

export default App;
