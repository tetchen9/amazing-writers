import { type Currency } from "@/types/currency";

/**
 * formatMoney is a function that formats a number into a currency string.
 * 
 * @param amount - The amount to be formatted.
 * @param currency - The currency of the amount.
 * @returns A string representing the formatted amount.
 * @example
 * formatMoney(1000, "EUR") // returns "EUR 1,000.00€"
 * formatMoney(1, "USD") // returns "USD 1.00$"
 */
export const formatMoney = (amount?: number, currency?: Currency): string => {
  if (amount === undefined || amount === null) {
    return "";
  }

  const formattedAmount = new Intl.NumberFormat("de-DE", {
    ...(currency && {
      currency,
      currencyDisplay: "narrowSymbol",
      currencySign: "standard",
      style: "currency",
    }),
    minimumFractionDigits: 2,  
    maximumFractionDigits: 2,  
    minimumIntegerDigits: 1,  
  }).format(amount);

  const prefix = currency ? `${currency} ` : "";
  return `${prefix}${formattedAmount}`;
};

/**
 * formatMembersNumber is a function that formats the number of members into a string.
 * 
 * @param membersNumber - The number of members.
 * @returns A string representing the formatted number of members.
 * 
 * @example
 * formatMembersNumber(1) // returns "1 member"
 * formatMembersNumber(2) // returns "2 members"
 * formatMembersNumber(0) // returns "0 members"
 */
export const formatMembersNumber = (membersNumber: number): string => {
  const suffix = membersNumber === 1 ? "" : "s";
  const numberOfMembers = `${membersNumber} member${suffix}`;
  return numberOfMembers;
};
