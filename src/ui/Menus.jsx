import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideModalEffect from "../hooks/useOutsideModalEffect";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  } 

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = setOpenId;

  const [position, setPosition] = useState();

  return (
    <MenusContext.Provider
      value={{ openId, close, open, setPosition, position }}
    >
      <StyledMenu>{children}</StyledMenu>
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { open, openId, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    // get some information of where the button is located
    const button = e.target.closest("button");
    const rect = button.getBoundingClientRect();

    const initialY = rect.y + rect.height + 8;
    const initialX = window.innerWidth - rect.width - rect.x + 10; // +10 gives the position which allows user to click on the bottom Toggle button which open other modal (user experience)

    // in addition we chnage the position of that menu while the user scroll up and down to keep that position on the same place
    function onScrollYStaticMenu() {
      const newRect = button.getBoundingClientRect();

      // so we basically get the new rect on the user scroll and update each sequence
      setPosition({
        x: window.innerWidth - newRect.width - newRect.x + 10,
        y: newRect.y + newRect.height + 8,
      });
    }

    window.addEventListener("scroll", onScrollYStaticMenu);

    // setting the position of the toggle modal
    setPosition({
      x: initialX,
      y: initialY,
    });

    // so if nothing is opened or current id is not equal to the one we clicked on (meaning we click on other toggle) then we open the one with the new id, otherwise it will close
    openId === "" || openId !== id ? open(id) : close();

    return () => document.removeEventListener("mousemove", onScrollYStaticMenu);
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const { ref } = useOutsideModalEffect({ callback: close });

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={() => handleClick()}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
