import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useSetting } from "./useSetting";
import useEditSetting from "./useEditSetting";
import { updateSetting } from "../../services/apiSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingsLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    },
    settingsError,
  } = useSetting();

  const { editSetting, isEditing } = useEditSetting();

  function updateSetting(e, field) {
    const { value } = e.target;

    if (!value) return;

    // if the value is the same
    switch (field) {
      case "minBookingsLength":
        if (Number(value) === minBookingsLength) return;
        break;
      case "maxBookingLength":
        if (Number(value) === maxBookingLength) return;
        break;
      case "maxGuestsPerBooking":
        if (Number(value) === maxGuestsPerBooking) return;
        break;
      case "breakfastPrice":
        if (Number(value) === breakfastPrice) return;
        break;
    }

    editSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isEditing}
          defaultValue={minBookingsLength}
          onBlur={(e) => updateSetting(e, "minBookingsLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isEditing}
          defaultValue={maxBookingLength}
          onBlur={(e) => updateSetting(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isEditing}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => updateSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isEditing}
          defaultValue={breakfastPrice}
          onBlur={(e) => updateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
