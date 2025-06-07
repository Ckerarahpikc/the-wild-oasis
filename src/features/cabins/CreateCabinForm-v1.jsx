import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // info: 'useForm' comes from 'react-hook-form', register is used to insert all data user type or select from the form, and the 'handleSubmit' is the function that will run validators and the actual function (check 'note' in the form)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // info: this will trigger 'discount' field everytime 'watch' will detect any changes on 'regularPrice'
  // note: even auto-fill
  // const regularPrice = watch("regularPrice");

  // useEffect(
  //   function () {
  //     // manually trigger discount
  //     trigger("discount");
  //   },
  //   [regularPrice, trigger]
  // );

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  // as a ref
  function onError(err) {
    console.log(err);
  }

  return (
    // info: handleSubmit runs validators and if at least one of the validation was not processed successfully the first function 'onSubmit' will not run, instead will run the second one we provide 'onError'
    // note: handleSubmit will validate our inputs before submitting
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Create name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              const regularPrice = Number(getValues("regularPrice"));
              if (!regularPrice) return "Please introduce regular price first";
              return (
                Number(value) <= regularPrice ||
                `Discount should be less than regular price. ${value} > ${regularPrice}`
              );
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          {...register("description", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        disabled={isCreating}
        label="Cabin photo"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="danger" size="medium" type="reset">
          Reset
        </Button>
        <Button variation="primary" size="medium" disable={isCreating}>
          Add Cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
