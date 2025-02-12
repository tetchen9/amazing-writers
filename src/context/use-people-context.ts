import { useContext } from "react";
import { PeopleContext } from "./people-page-context";

/**
 * Custom hook to access the PeopleContext.
 * 
 * This hook provides the current value of the PeopleContext. It must be used within a 
 * component that is wrapped by a PeopleContext.Provider. If used outside of a Provider, 
 * it will throw an error.
 * 
 * @returns The current value of the PeopleContext.
 * @throws {Error} If the hook is used outside of a PeopleContext.Provider.
 */
export function usePeopleContext() {
  const context = useContext(PeopleContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
