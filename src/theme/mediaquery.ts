const size = {
  mobile: "375px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
};

export const themeDevice = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};

declare module "styled-components" {
  export interface DefaultTheme {
    device: typeof themeDevice;
  }
}
