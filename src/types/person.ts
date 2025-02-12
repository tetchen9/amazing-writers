import { type Currency } from "./currency";
import { type Employment } from "./employment";

/**
 * Represents a person with various attributes.
 * 
 * @typedef {Object} Person
 * @property {number} id - The unique identifier for the person.
 * @property {string} name - The name of the person.
 * @property {string} book - The name of the most famous book written by writer.
 * @property {string} genre - The job title of the person.
 * @property {string} country - The country where the person resides.
 * @property {number} totalSales - The totalSales of the person.
 * @property {Currency} currency - The currency in which the totalSales is paid.
 * @property {Employment} employment - The employment status of the person.
 */
export type Person = {
  id: number
  name: string
  genre: string
  country: string
  totalSales: number
  book: string
  currency: Currency
  employment: Employment
};
