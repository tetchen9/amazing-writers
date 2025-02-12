import { ThemeProvider } from "@/theme/provider";
import { ReactElement, ReactNode } from "react";

// https://testing-library.com/docs/react-testing-library/setup#custom-render
export const TestProviders = (props: { children: ReactNode }): ReactElement => {
  const { children } = props;

  return <ThemeProvider>{children}</ThemeProvider>;
};
