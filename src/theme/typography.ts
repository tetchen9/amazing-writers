import { css } from "styled-components";

const rem = (sizeInPX: number) => `${sizeInPX / 16}rem`;

function getTextStyles(
  fontWeight: number,
  fontSizeInPX: number,
  lineHeightInPX: number,
) {
  return css`
    font-weight: ${fontWeight};
    font-size: ${rem(fontSizeInPX)};
    line-height: ${rem(lineHeightInPX)};
    margin: 0;
  `;
}

export const themeTypography = {
  h1: getTextStyles(500, 26, 32),
  h2: getTextStyles(500, 24, 30),
  h3: getTextStyles(500, 22, 28),

  bodyLead: getTextStyles(400, 18, 26),

  body: getTextStyles(400, 16, 24),
  bodyMedium: getTextStyles(500, 16, 24),
  bodyBold: getTextStyles(600, 16, 24),

  bodySmall: getTextStyles(400, 14, 22),
  bodySmallMedium: getTextStyles(500, 14, 22),
  bodySmallBold: getTextStyles(600, 14, 22),

  bodyCaption: getTextStyles(400, 13, 16),

  tableHeader: getTextStyles(600, 11, 16),
};

declare module "styled-components" {
  export interface DefaultTheme {
    typography: typeof themeTypography;
  }
}
