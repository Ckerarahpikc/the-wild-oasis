import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteBooking(id),

    onSuccess: () => {
      toast.success(`Booking was successfully deleted.`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error(`Could not delete current booking. Try again later.`);
    },
  });

  return { mutate, isPending };
}

export default useDeleteBooking;
