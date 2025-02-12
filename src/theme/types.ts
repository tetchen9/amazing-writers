export type ButtonVariants = "primary" | "secondary" | "default"

/**
 * Represents the styles for different button variants.
 * 
 * @template ButtonVariants - A union type of possible button variant names.
 * A button can be of type "primary", "secondary", or "default".
 * 
 * @typedef {Object} ButtonStylesType
 * @property {string} text - The text color of the button.
 * @property {string} background - The background color of the button.
 * @property {string} [border] - The optional border style of the button.
 * @property {string} hover.background - The background color of the button when hovered.
 * @property {string} focus.outline - The outline style of the button when focused.
 */
export type ButtonStylesType = {
  [key in ButtonVariants]: {
    text: string
    background: string
    border?: string
    hover: {
      background: string
    },
    focus: {
      outline: string
    }
  }
}
