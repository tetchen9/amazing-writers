import { ReactElement } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { ButtonVariants, ButtonStylesType } from "@/theme/types";
import { SROnly } from "../sr-only";

type ButtonOrLinkProps = 
  |{
    /** The html tag to render as. */
    as?: "button" | undefined
    /** If the component renders as a button, it should not have a to param. */
    to?: never
  }
  |{
    /** The html tag to render as. */
    as?: "a"
    /** The URL to navigate to if the component renders as a link. */
    to: string
  }
  
type CommonProps = {
  /** The function to call when the button is clicked. */
  onClick?: () => void
  /** The variant of the button/link. */
  $variant?: ButtonVariants
  /** The content to display within the button/link. */
  children: ReactElement | string
  /** Aria label for the button/link. */
  ariaLabel?: string
}

type LabelProps = {
  /** Indicates if the button is in a loading state. */
  $isLoading?: boolean
  /** An optional icon to display within the button. */
  $icon?: ReactElement
}

const buttonCss = css<CommonProps>`
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  height: 2.75rem;
  padding: 10px 24px;
  border-radius: 50px;
  text-decoration: none;
  
  ${({ theme, $variant }) => {
    const buttonColors = theme.color.button[$variant as keyof ButtonStylesType];
    return css`
      background-color: ${buttonColors.background};
      border: ${buttonColors.border ? `2px solid ${buttonColors.border}`: "none"};
      color: ${buttonColors.text};

      &:hover {
        background-color: ${buttonColors.hover.background};
      }
      
      &:focus {
        outline: 2px solid ${buttonColors.focus.outline};
        outline-offset: 4px;
      }
    `;
  }}
  ${({ theme }) => theme.typography.bodyMedium};

`;

const StyledLink = styled(Link)<CommonProps>`${buttonCss}`;
const StyledButton = styled.button<CommonProps>`${buttonCss}`;

const StyledLabel = styled.span<LabelProps>`
  transition: color 250ms;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  ${({ theme }) => theme.typography.bodyMedium}
  
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      color: transparent;
  `}

  ${({ $icon }) =>
    $icon &&
    css`
      svg {
        height: 1.25rem;
        width: 1.25rem;
      }

      span { 
        display: none;
      }
  
      @media ${({theme}) => theme.device.tablet} {
        span { 
          display: inline;
        }
      }
  `}

`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.span`
  position: absolute;
  display: block;
  width: 1em;
  height: 1em;
  top: calc(50% - 0.5em);
  left: calc(50% - 0.5em);
  border-width: 2px;
  border-color: inherit;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-style: solid;
  border-radius: 50%;
  animation: ${spin} 0.45s linear infinite;
`;

type Props = ButtonOrLinkProps & CommonProps & LabelProps 

/**
 * A versatile Button component that can render as either 
 * a `button` or 
 * a react-router-dom Link component (`a` in the dom).
 * 
 * @param {Props} props - The properties object.
 * @param {string} [props.$variant="primary"] - The variant of the button, defaults to "primary".
 * @param {boolean} [props.$isLoading] - Indicates if the button is in a loading state.
 * @param {ReactNode} [props.$icon] - An optional icon to display within the button.
 * @param {string} [props.as] - Determines if the component should render as a Link or a button.
 * @param {string} [props.to] - The URL to navigate to if the component renders as a link.
 * @param {ReactNode} props.children - The content to display within the button.
 * @param {object} rest - Additional properties to pass to the button or link element.
 * 
 * @returns {ReactElement} The rendered button or link component.
 */
export const Button = (props: Props): ReactElement => {
  const { $variant = "primary", $isLoading, $icon, as, to, children, ...rest } = props;

  const wrappedChildren = (<>
    <StyledLabel $isLoading={$isLoading} $icon={$icon}>
      {!!$icon && $icon}
      <span>{children}</span>
    </StyledLabel>
    {$isLoading && (
      <>
        <SROnly aria-live="assertive">Loading</SROnly>
        <StyledSpinner />
      </>
    )}
  </>);

  if(as === "a") {
    return (
      <StyledLink to={to} $variant={$variant} {...rest}> 
        {wrappedChildren}
      </StyledLink>
    );
  }

  return (
    <StyledButton type='button' $variant={$variant} {...rest}>
      {wrappedChildren}
    </StyledButton>
  );
};
