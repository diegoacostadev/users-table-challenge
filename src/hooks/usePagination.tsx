import {useState} from "react";

export default function usePagination({
  initialPage,
  pageSize,
  totalCount,
}: {
  initialPage: number;
  pageSize: number;
  totalCount: number;
}) {
  const [page, setPage] = useState(initialPage);
  const paginationNumbers = Math.ceil(totalCount / pageSize);

  const handlePaginationChange = (idx: number) => {
    setPage(idx);
  };

  const goToFirst = () => {
    setPage(initialPage);
  };

  const goToLast = () => {
    setPage(paginationNumbers - 1);
  };

  const getRange = () => {
    return [page * pageSize, page * pageSize + pageSize];
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const isPrevDisabled = () => {
    return page == 0;
  };

  const isNextDisabled = () => {
    return page * pageSize + pageSize >= totalCount;
  };

  return {
    page,
    paginationNumbers,
    changePage: handlePaginationChange,
    goToFirst,
    goToLast,
    getRange,
    prevPage,
    nextPage,
    isPrevDisabled: isPrevDisabled(),
    isNextDisabled: isNextDisabled(),
  };
}
