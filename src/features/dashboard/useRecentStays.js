import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();

  // getting the filter from search params
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // note: basically calculating from the last <number> days and give the api a date to begin with
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: stays, isPending } = useQuery({
    queryKey: ["staysAfterDate", `last-${numDays}`], // info: dynamic query
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { numDays, stays, confirmedStays, isPending };
}

export default useRecentStays;
