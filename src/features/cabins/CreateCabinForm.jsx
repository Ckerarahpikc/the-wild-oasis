import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useEditCabin from "./useEditCabin";
import useCreateCabin from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // info: so basically here I get the values from the row that user clicked on, he clicks and we just grab those values that are used to represent the row itself, simple
  const { id: editId, ...editValues } = cabinToEdit;
  // info: editing session based on the id (if present - true/1, if not - false/0)
  const isEditingSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  });
  const { isEditing, editCabin } = useEditCabin(reset);
  const { isCreating, createCabin } = useCreateCabin();
  const isWorkingHard = isCreating || isEditing;

  // info: 'useForm' comes from 'react-hook-form', register is used to insert all data user type or select from the form, and the 'handleSubmit' is the function that will run validators and the actual function (check 'note' in the form)

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
    const image = typeof data.image === "string" ? data.image : data.image[0];

    isEditingSession
      ? editCabin(
          { newCabin: { ...data, image }, id: editId },
          {
            onSuccess: (data) => {
              onCloseModal?.();
              reset();
            },
          }
        )
      : createCabin(
          { newCabin: { ...data, image: image } },
          {
            onSuccess: (data) => {
              reset();
              onCloseModal?.();
            },
          }
        );
  }
  // as a ref
  function onError(err) {
    console.log(err);
  }

  return (
    // info: handleSubmit runs validators and if at least one of the validation was not processed successfully the first function 'onSubmit' will not run, instead will run the second one we provide 'onError'
    // note: handleSubmit will validate our inputs before submitting
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Create name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isWorkingHard}
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
          disabled={isWorkingHard}
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
          disabled={isWorkingHard}
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
          disabled={isWorkingHard}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
        type="full"
      >
        <Textarea
          type="number"
          id="description"
          {...register("description", { required: "This field is required" })}
          disabled={isWorkingHard}
        />
      </FormRow>

      <FormRow
        disabled={isWorkingHard}
        label="Cabin photo"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingSession ? false : "Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          size="medium"
          onClick={() => onCloseModal?.()}
        >
          Close
        </Button>
        <Button variation="primary" size="medium" disable={isWorkingHard}>
          {isEditingSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
