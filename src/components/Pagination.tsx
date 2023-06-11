export default function Pagination({
  paginationNumbers,
  changePage,
  goToFirst,
  goToLast,
  prevPage,
  nextPage,
  isPrevDisabled,
  isNextDisabled,
  current,
}: {
  paginationNumbers: number;
  current: number;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  changePage: (n: number) => void;
  prevPage: () => void;
  nextPage: () => void;
  goToLast: () => void;
  goToFirst: () => void;
}) {
  return (
    <ol
      style={{
        listStyle: "none",
        display: "flex",
        gap: "0 1rem",
        justifyContent: "center",
      }}
    >
      <button disabled={isPrevDisabled} onClick={goToFirst}>
        {"<<"}
      </button>
      <button disabled={isPrevDisabled} onClick={prevPage}>
        {"Prev"}
      </button>
      {Array.from({length: paginationNumbers}).map((n, idx) => {
        return (
          <li key={idx}>
            <button
              style={{
                backgroundColor: current == idx ? "#ffb300" : "#fff",
              }}
              onClick={() => changePage(idx)}
            >
              {String(idx + 1)}
            </button>
          </li>
        );
      })}
      <button disabled={isNextDisabled} onClick={nextPage}>
        {"Next"}
      </button>
      <button disabled={isNextDisabled} onClick={goToLast}>
        {">>"}
      </button>
    </ol>
  );
}
