import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      // note: the 'data' is from the apiBooking, so after the mutationFn was successfull it's retrieving the 'data' from that function which then we can use here in 'onSuccess' function
      toast.success(`Booking ${data.id} was successfully checked out.`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error(`Could not check out current booking. Try again later.`);
    },
  });

  return { isCheckingOut, checkout };
}

export default useCheckout;
