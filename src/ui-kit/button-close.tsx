import { ComponentPropsWithoutRef, ReactElement } from "react";
import styled from "styled-components";

const StyledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  border: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;

  &: hover {
    background-color: ${({ theme }) => theme.color.blueChalk};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.color.greyLunch};
  }
`;

type Props = ComponentPropsWithoutRef<"button">


/**
 * ButtonClose component renders a styled button with an icon.
 *
 * @param children - The icon element to be displayed inside the button.
 * @returns A React element representing a button with an icon.
 */
export const ButtonClose = (props: Props): ReactElement => {
  const { children, ...rest } = props;

  return (
    <StyledIconButton type="button" {...rest}>
      {children}
    </StyledIconButton>
  );
};
