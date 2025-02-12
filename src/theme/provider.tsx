import { ReactElement, ReactNode } from "react";
import type { DefaultTheme } from "styled-components";
import {
  ThemeProvider as Provider,
  createGlobalStyle,
} from "styled-components";
import { normalize } from "styled-normalize";
import { themeColor } from "./color";
import { themeSpace } from "./spacing";
import "./fonts/styles.css";
import { themeTypography } from "./typography";
import { themeDevice } from "./mediaquery";

const theme: DefaultTheme = {
  typography: themeTypography,
  color: themeColor,
  space: themeSpace,
  device: themeDevice,
};

const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  :root {

    --font-primary: "Inter", sans-serif;
    --layout-width: 1100px;

    --z-index-table-head: 2;
    --z-index-table-row: 1;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: var(--font-primary);
    ${({ theme }) => theme.typography.body};
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    color:${({ theme }) => theme.color.darkBlue};
    background-color:${({ theme }) => theme.color.linkWater};
  }
`;

export const ThemeProvider = (props: { children: ReactNode }): ReactElement => {
  const { children } = props;

  return (
    <Provider theme={theme}>
      <GlobalStyle />
      {children}
    </Provider>
  );
};
