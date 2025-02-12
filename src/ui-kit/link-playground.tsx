import { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 16px;
  background-color:${({ theme }) => theme.color.blank};
  color:${({ theme }) => theme.color.irisBlue};
  font-weight: 600;
  transition:
    background-color 200ms,
    color 200ms;
  border-top-left-radius: 6px;

  &:hover,
  &:focus {
    outline: none;
    background-color:${({ theme }) => theme.color.irisBlue};
    color:${({ theme }) => theme.color.blank};
  }
`;

export const LinkPlayground = (): ReactElement => {
  return <StyledLink to="/playground">Playground</StyledLink>;
};
