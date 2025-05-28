import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    // note: use query will try 'three' times to refetch the data again, but sometimes we do not want that, so we use retry: false
    retry: false
  });

  return { data, isLoading };
}

export default useBooking;
