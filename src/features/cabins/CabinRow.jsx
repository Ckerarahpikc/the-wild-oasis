import styled, { css } from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

import { formatCurrency } from "../../utils/helpers";
import useDeleteCabin from "./useDeleteCabin";
import {
  HiDocumentDuplicate,
  HiMiniPencilSquare,
  HiTrash,
} from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useOutsideModalEffect from "../../hooks/useOutsideModalEffect";

// const TableRow = styled.div`
//   ${(props) =>
//     props.type === "regular"
//       ? css`
//           display: flex;
//           flex: 1 0 auto;
//         `
//       : css`
//           display: grid;
//           grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//           column-gap: 2.4rem;
//         `}

//   align-items: center;
//   padding: 1.4rem 2.4rem;
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function createCabinDuplicate() {
    createCabin({
      newCabin: {
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
      },
    });
  }

  const isWorkingHard = isDeleting || isCreating;

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div style={{ display: "flex", gap: "1rem" }}>
        <Modal>
          <Menus>
            <Menus.Toggle id={cabinId}></Menus.Toggle>

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiDocumentDuplicate />}
                onClick={createCabinDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiMiniPencilSquare />}>Edit</Menus.Button>
              </Modal.Open>
              
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>

            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isWorkingHard}
              />
            </Modal.Window>
            
          </Menus>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
