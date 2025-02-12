import axios from "axios";
import appConfig from "@/config";
import { type Person } from "@/types/person";

/**
 * Fetches a list of people from the API.
 * If requestParams is provided, it will be appended to the request URL 
 * and the list of people will be filtered accordingly.
 *
 * @param requestParams - Optional query parameters to be appended to the request URL.
 * @example
 * fetchPeople("?name_like=anne&employment=poet");
 * returns a list of people with 1) the name that contains "anne" and 2) employment status "poet".
 * 
 * @returns A function that, when called, performs the API request 
 * and returns a promise resolving to an array of `Person` objects.
 */
export const fetchPeople = (requestParams: string | undefined = "") => {
  const path = "/people";
  const url = `${appConfig.baseAPIUrl}${path}${requestParams}`;
  return async () => {
    const response = await axios.get<Person[]>(url);
    return response.data;
  };
};
