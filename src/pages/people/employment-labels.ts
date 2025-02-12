import { type Employment } from "@/types/employment";

/**
 * A mapping of employment values to their corresponding labels.
 * 
 * @typeParam Employment - The type representing different employment statuses.
 * @property poet - Label for poet employment type.
 * @property prosewriter - Label for prosewriter employment type.
 */
export const EmploymentLabels: {
  [key in Employment]: string;
} = {
  poet: "Poet",
  prosewriter: "ProseWriter"
};
