/**
 * Spacing tokens for design system.
 * Using them ensures consistent spacing between elements.
 * Usage of space theme was descoped for this exercise.
 */

export const themeSpace = {
  xxxs: ".375rem",  //'6px'
  xxs:  ".5rem",    //'8px'
  xs:   ".625rem",  //'10px'
  s:    ".75rem",   //'12px'
  m:    "1rem",     //'16px'
  l:    "1.25rem",  //'20px'
  xl:   "2rem",     //'32px'
  xxl:  "2.125rem", //'34px'
  xxxl: "2.5rem",   //'40px'
};

declare module "styled-components" {
  export interface DefaultTheme {
    space: typeof themeSpace
  }
}
