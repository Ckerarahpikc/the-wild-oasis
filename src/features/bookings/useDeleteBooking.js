import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function useDeleteBooking() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteBooking(id),

    onSuccess: () => {
      toast.success(`Booking was successfully deleted.`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error(`Could not delete current booking. Try again later.`);
    },
  });

  return { mutate, isLoading };
}

export default useDeleteBooking;
