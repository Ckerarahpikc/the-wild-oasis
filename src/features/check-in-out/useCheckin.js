import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),

    onSuccess: (data) => {
      // note: the 'data' is from the apiBooking, so after the mutationFn was successfull it's retrieving the 'data' from that function which then we can use here in 'onSuccess' function
      toast.success(`Booking ${data.id} was successfully checked in.`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => {
      toast.error(`Could not check in current booking. Try again later.`);
    },
  });

  return { isCheckingIn, checkIn };
}
