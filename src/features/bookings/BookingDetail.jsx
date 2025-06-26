import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import useBooking from "./useBooking";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isPending: isBookingLoading } = useBooking();
  const { isCheckinOut, checkout } = useCheckout();
  const { mutate: deleteBooking, isPending: isLoadingDeleteBooking } =
    useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  useEffect(() => {
    console.log("Active Query Keys:", queryClient.getQueryCache().getAll());
  }, []);

  if (isBookingLoading || isCheckinOut || isLoadingDeleteBooking)
    return <Spinner />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="deleteBookingN">
            <Button variation="danger" size="medium">
              Delete booking
            </Button>
          </Modal.Open>

          <Modal.Window name="deleteBookingN">
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              onConfirm={() => {
                deleteBooking(bookingId);
                navigate(`/bookings`);
              }}
              disabled={isLoadingDeleteBooking}
            />
          </Modal.Window>
        </Modal>

        {status === "checked-in" && (
          <Button
            variation="primary"
            size="medium"
            onClick={() => checkout(bookingId)}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
