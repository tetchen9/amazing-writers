import styled, { DefaultTheme, css } from "styled-components";

type TextProps = {
  $variant?: keyof DefaultTheme["typography"]
  $color?: keyof DefaultTheme["color"]
};

export const Text = styled.span<TextProps>`
  ${({$variant, theme}) => {
    return theme.typography[$variant ?? "body"];
  }}

  ${({$color, theme}) => {
    return (
      $color &&
      css`
        color: ${theme.color[$color]});
      `
    );
  }}
`;
