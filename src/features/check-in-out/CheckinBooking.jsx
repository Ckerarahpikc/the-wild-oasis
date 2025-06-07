import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import useBooking from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin: 2rem 0;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmHasBreakfast, setConfirmHasBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { isCheckingIn, checkIn } = useCheckin();
  const { data: booking, isLoading: isLoadingBooking } = useBooking();
  const {
    settings,
    isLoading: isLoadingSettings,
    settingsError,
  } = useSetting();

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
      setConfirmHasBreakfast(booking?.hasBreakfast ?? false);
    },
    [booking]
  );

  if (isLoadingBooking || isLoadingSettings || isCheckingIn) return <Spinner />;

  const {
    id: bookingId,
    guests: { fullName },
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    cabinPrice,
  } = booking;

  // calculating price for the breakfast
  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (confirmHasBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: false,
          totalPrice: totalPrice - optionalBreakfastPrice,
        },
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmHasBreakfast}
          onChange={() => {
            setConfirmHasBreakfast((state) => !state);
            setConfirmPaid(false);
          }}
          id={bookingId}
        >
          I want a breakfast for ${optionalBreakfastPrice}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((state) => !state)}
          disabled={confirmPaid}
          id="booking"
        >
          I confirm that {fullName} has paid the total amount of $
          {/* note: () here I just conditionally check if the booking has breakfast then calculate something for the user to be shown otherwise just cabinPrice */}
          {confirmHasBreakfast
            ? cabinPrice + optionalBreakfastPrice
            : cabinPrice}{" "}
          {confirmHasBreakfast &&
            `(${cabinPrice}$ + ${optionalBreakfastPrice}$)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          variation="primary"
          size="medium"
          onClick={handleCheckin}
          disabled={!confirmPaid}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
