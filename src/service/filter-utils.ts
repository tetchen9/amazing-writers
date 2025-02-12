import { employments, type Employment } from "@/types/employment";

/**
 * Returns the employment to filter by or undefined.
 * The list of filters has maximum of two options.
 * Returns undefined if there are no employments to filter by, or when both options are selected.
 * Returns the first employment if only one option is selected.
 * @param filters list of employments
 * @returns employment or undefined
 */
export const getEmploymentToFilterBy = (filters: Employment[] = []) => {
  return filters.length !== employments.length ? filters[0] : undefined; 
};

/**
 * Sanitises the input string to be used as a url parameter.
 * Replaces spaces with "+", and removes special characters.
 * @param str input string
 * @returns sanitised string
 */
export const sanitiseParam = (str: string): string => {
  return str.trim().replace(/\s+/g, "+").replace(/[/&?=:%]/g, "");
};
