import { useQuery } from "@tanstack/react-query";
import { apiGetSession } from "../../services/apiAuth";

export default function useUser() {
  // note: the key error was here, I was intentionally calling 'user' directly instead of calling 'data' then renaming it
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: apiGetSession,
  });

  return { isAuthenticated: user?.role === "authenticated", isLoading };
}
