import { getBookings } from "../../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTERING
  const filterValue = searchParams.get("status");
  // because there's not such status in db as 'all' we have to handle this as follow
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORTING
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // PRE-FETCHING
  // info: this will prefetch the previous and next booking in the client (very clever thing)
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page + 1],
    queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
  });

  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page - 1],
    queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
  });

  const {
    isPending,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isPending, bookings, error, count };
}

export default useBookings;
