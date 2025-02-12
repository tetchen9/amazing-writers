import { ComponentPropsWithoutRef, ReactElement } from "react";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0%,
  25% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 650px;
  }
`;

const Container = styled.div`
  width: 36px;

  svg .logo {
    stroke: ${({ theme }) => theme.color.sapphire};
    stroke-dashoffset: 0;
    stroke-dasharray: 650px;
    animation: ${animation} 1.2s infinite alternate;
    animation-timing-function: ease-in;
  }
`;

export const LoadingLogo = (
  props: ComponentPropsWithoutRef<"div">
): ReactElement => {
  return (
    <Container {...props}>
      <svg viewBox="0 0 330 330" fill="#444444" xmlns="http://www.w3.org/2000/svg">
        <path
          className="logo"
          d="M 165, 165
          m -75, 0
          a 75,75 0 1,0 150,0
          a 75,75 0 1,0 -150,0"
          fill="none"
          strokeWidth="8" ></path>
      </svg>
    </Container>
  );
};
