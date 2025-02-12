import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { type Employment } from "@/types/employment";
import { type Person } from "@/types/person";
import { fetchPeople } from "@/api-service";
import { getEmploymentToFilterBy, sanitiseParam } from "../service/filter-utils";

/**
 * Custom hook to fetch a list of people based on the provided name and employments.
 *
 * @param {string} [name] - Optional name to filter the people.
 * @param {Employment[]} [employments] - Optional array of employments to filter the people.
 * @returns {QueryObserverResult<Person[], Error>} - The result of the query containing the list 
 * of people or an error.
 */
export const useFetchPeople = (name?: string, employments?: Employment []): QueryObserverResult<Person[], Error> => {
  const requestParams = getFetchPeopleRequestParams(name, employments);
  return useQuery<Person[], Error>({
    queryKey: ["people", requestParams],
    queryFn: fetchPeople(requestParams),
    refetchOnWindowFocus: false,
    staleTime: 500,
    retry: 0,
  });
};

/**
 * Constructs a query string for fetching people based on name and employment filters.
 * The name parameter gets sanitised before being appended to the query string.
 * The employment parameter is derived from the employments array. If all employments are selected,
 * the employment parameter is omitted from the query string.
 *
 * @param name - An optional name to filter the people by.
 * @param employments - An optional array of Employment objects to filter the people by.
 * @returns A query string to be appended to the URL for fetching people.
 */
export const getFetchPeopleRequestParams = (name?: string, employments?: Employment []): string => {
  const employment = getEmploymentToFilterBy(employments);
  const hasName = name && `name_like=${sanitiseParam(name)}`;
  const hasEmployment = employment && `employment=${employment}`;
  const params = [hasName, hasEmployment].filter(Boolean).join("&");
  return params ? `?${params}` : "";
};
