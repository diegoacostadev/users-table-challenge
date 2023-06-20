import {useRef} from "react";
import {useQuery} from "@tanstack/react-query";

import {api} from "../services/api";

export default function useUsers({page}: {page: number}) {
  const usersRef = useRef<Result[]>([]);
  // const [error, setError] = useState<{message: string} | null>(null);
  // const [loading, setLoading] = useState(false);
  const {
    isLoading: loading,
    isError: error,
    data,
    status,
  } = useQuery<Result[]>({
    queryKey: ["users", page],
    queryFn: async () => (await api.users.list(page)).results,
    keepPreviousData: true,
  });

  return {
    usersRef: usersRef.current,
    rawUsers: data,
    loading,
    error,
  };
}
