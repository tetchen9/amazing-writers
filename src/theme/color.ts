import { type ButtonStylesType } from "./types";

/**
 * A collection of color values used throughout the application.
 * Each color is represented by a key that describes its appearance.
 * The value is a hexadecimal color code.
 */
export const colorPalette = {
  irisBlue: "#1c3c89",
  aztekBlue: "#5447ff",
  darkBlue: "#10234b",
  redPink: "#cf4a5a",
  sizzlingRed: "#cf3a50",
  cosmos: "#9fdbde",
  geyser: "#9bd3dc",
  sapphire: "#1639a4",
  bayoux: "#225f7f",
  lynch: "#217798",
  greyLunch: "#297786",
  blueChalk: "#5cedf2",
  mischka: "#c8ecee",
  catskillWhite: "#caf0f6",
  paleViolet: "#57b8eb",
  linkWater: "#b4f7fc",
  ghostWhite: "#b9faff",
  blank: "#ffffff"
};

const opactity = {
  "30": "4D",
  "45": "73",
  "65": "A6",
};

const buttonColors: ButtonStylesType = {
  primary: {
    text: colorPalette.blank,
    background: colorPalette.irisBlue,
    hover: {
      background: colorPalette.aztekBlue
    },
    focus: {
      outline: colorPalette.irisBlue + opactity[65]
    }
  },
  secondary: {
    text: colorPalette.blank,
    background: colorPalette.redPink,
    hover: {
      background: colorPalette.sizzlingRed
    },
    focus: {
      outline: colorPalette.redPink + opactity[65]
    }
  },
  default: {
    text: colorPalette.lynch,
    background: colorPalette.blank,
    border: colorPalette.lynch + opactity[30],
    hover: {
      background: colorPalette.catskillWhite + opactity[45]
    },
    focus: {
      outline: colorPalette.lynch + opactity[65]
    }
  },
};

export const uiKitColors = {
  button: buttonColors,
  input: {
    text: colorPalette.darkBlue,
    placeholder: colorPalette.bayoux,
    background: colorPalette.blank,
    border: colorPalette.lynch,
    hover: {
      background: colorPalette.catskillWhite + opactity[45],
    },
    focus: {
      outline: colorPalette.lynch,
      background: colorPalette.catskillWhite + opactity[45],
    },
    filled: {
      background: colorPalette.catskillWhite + opactity[45],
    }
  },
  filter: {
    text: colorPalette.darkBlue,
    border: colorPalette.paleViolet,
    hover: {
      background: colorPalette.linkWater,
    },
    focus: {
      outline: colorPalette.irisBlue,
    },
  },
  checkbox: {
    border: colorPalette.paleViolet,
    background: colorPalette.blank,
    hover: {
      border: colorPalette.irisBlue,
    },
    focus: {
      border: colorPalette.irisBlue,
    },
    checked: {
      fill: colorPalette.irisBlue,
      border: colorPalette.paleViolet,
      focus: {
        border: colorPalette.irisBlue,
      }
    }
  },
  table: {
    header: {
      text: colorPalette.darkBlue,
      background: colorPalette.catskillWhite,
      border: colorPalette.blank,
    },
    row: {
      text: colorPalette.bayoux,
      background: colorPalette.blank,
      border: colorPalette.mischka,
    },
  },
};

export const themeColor = {
  ...colorPalette,
  ...uiKitColors
};

declare module "styled-components" {
  export interface DefaultTheme {
    color: typeof themeColor;
  }
}
