import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import useFilters from "./hooks/userFilters";
import Pagination from "./components/Pagination";
import usePagination from "./hooks/usePagination";

const PAGE_SIZE = 10;

function App() {
  const {
    handleSort,
    showColoredRows,
    users: sorted,
    handleDelete,
    handleColoredRows,
    handleOrderedByCountry,
    handleSearch,
    restoreToInitialState,
    search,
  } = useFilters();

  const {
    paginationNumbers,
    getRange,
    page,
    changePage,
    goToFirst,
    goToLast,
    prevPage,
    nextPage,
    isPrevDisabled,
    isNextDisabled,
  } = usePagination({
    initialPage: 0,
    pageSize: PAGE_SIZE,
    totalCount: sorted.length,
  });

  const [initial, end] = getRange();

  const users = sorted.slice(initial, end);

  return (
    <>
      <SearchBar
        handleColoredRows={handleColoredRows}
        handleOrderedByCountry={handleOrderedByCountry}
        handleSearch={handleSearch}
        restoreToInitialState={restoreToInitialState}
        search={search}
      />
      <UserTable
        changeSort={handleSort}
        showColoredRows={showColoredRows}
        users={users}
        onDelete={handleDelete}
      />
      <Pagination
        changePage={changePage}
        current={page}
        goToFirst={goToFirst}
        goToLast={goToLast}
        isNextDisabled={isNextDisabled}
        isPrevDisabled={isPrevDisabled}
        nextPage={nextPage}
        paginationNumbers={paginationNumbers}
        prevPage={prevPage}
      />
    </>
  );
}

export default App;
