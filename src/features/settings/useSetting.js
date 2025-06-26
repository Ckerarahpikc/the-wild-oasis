import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
  const { data: settings, isPending, error: settingsError } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isPending, settingsError };
}
