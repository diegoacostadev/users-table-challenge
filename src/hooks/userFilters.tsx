import {InfiniteData} from "@tanstack/react-query";
import {SyntheticEvent, useCallback, useEffect, useMemo, useState} from "react";

export default function useFilters({usersRef}: {usersRef: Result[] | undefined}) {
  const [originalUsers, setOriginalUsers] = useState(usersRef);
  const [showColoredRows, setShowColoredRows] = useState(false);
  const [orderedByCountry, setOrderedByCountry] = useState(false);
  const [sort, setSort] = useState<Sort>({
    type: "asc",
    value: "none",
  });

  useEffect(() => {
    setOriginalUsers(usersRef);
  }, [usersRef]);

  const [search, setSearch] = useState("");

  const handleColoredRows = () => {
    setShowColoredRows(!showColoredRows);
  };

  const handleOrderedByCountry = () => {
    setOrderedByCountry(!orderedByCountry);
  };

  const filteredUsers = useMemo(() => {
    if (!originalUsers) return;
    let draft = Array.from(originalUsers);

    if (search) {
      draft = draft.filter((u) => u.location.country.toLowerCase().includes(search.toLowerCase()));
    }

    return draft;
  }, [originalUsers, search]);

  const sortFn = useCallback((first: string, second: string) => first.localeCompare(second), []);

  const compareProperties: Record<Exclude<SortValue, "none">, (user: Result) => string> = useMemo(
    () => ({
      first: (user) => user.name.first,
      last: (user) => user.name.last,
      country: (user) => user.location.country,
    }),
    [],
  );

  const getKeyValue = useCallback((key: string, elem: Result) => {
    return key == "first" || key == "last"
      ? elem.name[key]
      : key == "country"
      ? elem.location[key]
      : "";
  }, []);

  const users = useMemo(() => {
    if (!filteredUsers) return;
    let draft = Array.from(filteredUsers);

    if (sort.value != "none") {
      draft.sort((a, b) => {
        const getKey = compareProperties[sort.value as Exclude<SortValue, "none">];

        if (sort.type == "asc") {
          return sortFn(getKey(a), getKey(b));
        } else {
          return sortFn(getKey(b), getKey(a));
        }
      });
    }

    return draft;
  }, [sort, filteredUsers, compareProperties, sortFn]);

  const handleSort = (key: SortValue) => {
    setSort((prev) => ({
      value: key,
      type: prev.type == "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = ({id}: {id: string | null}) => {
    if (!originalUsers) return;
    const draft = originalUsers.filter((u) => u.id.value !== id);

    setOriginalUsers(draft);
  };

  const restoreToInitialState = () => {
    setOriginalUsers(usersRef);
  };

  const handleSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget;

    setSearch(value);
  };

  return {
    users,
    search,
    handleColoredRows,
    handleDelete,
    handleSort,
    handleOrderedByCountry,
    handleSearch,
    restoreToInitialState,
    showColoredRows,
  };
}
