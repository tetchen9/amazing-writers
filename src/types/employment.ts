
export const employments = ["poet", "prosewriter"] as const;

/**
 * Represents an employment type derived from the `employments` array.
 * The array has two values: "poet" and "prosewriter".
 * This type is a union of all possible values within the `employments` array.
 */
export type Employment = typeof employments[number]
