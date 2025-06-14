import styled from "styled-components";
import { useTheme } from "../contexts/ThemeProvider";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { theme } = useTheme();

  const src = theme ? "/logo-light.png" : "/logo-dark.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
