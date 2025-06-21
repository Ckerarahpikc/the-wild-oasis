import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useTheme } from "../contexts/ThemeProvider";
import { useEffect } from "react";

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ButtonIcon onClick={() => toggleTheme()}>
      {theme === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
