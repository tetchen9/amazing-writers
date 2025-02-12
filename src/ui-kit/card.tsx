import styled from "styled-components";
import { DefaultTheme } from "styled-components";

const cardRadius = ({ theme }: { theme: DefaultTheme }) => theme.space.xs;
const cardPadding = ({ theme }: { theme: DefaultTheme }) => theme.space.xl;

export const Card = styled.div`
  background-color:${({ theme }) => theme.color.blank};
  border-radius: ${cardRadius};
  box-shadow: 6px 6px 54px rgba(0, 0, 0, 0.05);
`;

export const CardHeader = styled.header`
  padding: ${cardPadding};
  border-bottom: 1px solid${({ theme }) => theme.color.mischka};
  border-top-left-radius:  ${cardRadius};
  border-top-right-radius:  ${cardRadius};
`;

export const CardBody = styled.div`
  padding: ${cardPadding};
`;

export const CardFooter = styled.footer`
  padding: ${cardPadding};
  background-color: ${({ theme }) => theme.color.ghostWhite};
  border-bottom-left-radius:  ${cardRadius};
  border-bottom-right-radius:  ${cardRadius};
`;
