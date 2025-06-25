import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // getting the filter from search params
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // note: basically calculating from the last <number> days and give the api a date to begin with
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: bookings, isPending } = useQuery({
    queryKey: ["bookingsAfterDate", `last-${numDays}`], // info: dynamic query
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { bookings, isPending };
}

export default useRecentBookings;
