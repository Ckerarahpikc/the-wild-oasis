import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings edited successfully");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: (err) => {
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { editSetting, isEditing };
}

export default useEditSetting;
