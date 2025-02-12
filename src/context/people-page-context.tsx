import { useState, useEffect, createContext, ReactNode, useMemo } from "react";
import debounce from "lodash.debounce";
import { useFetchPeople } from "@/hooks/use-fetch-people";
import { type Person } from "@/types/person";
import { type Employment } from "@/types/employment";

/**
 * Context for managing people data
 * 
 * @typedef {Object} PeopleContextType
 * @property {Person[] | null} people - The list of people fetched based on search and filters.
 * @property {string} search - The current search term.
 * @property {Employment[]} filters - The current list of filters applied.
 * @property {boolean} isError - Indicates if there was an error fetching the data.
 * @property {boolean} isLoading - Indicates if the data is currently being fetched.
 * @property {boolean} isSuccess - Indicates if the data was successfully fetched.
 * @property {function} onFilterChange - Handler for changing the filters.
 * @property {function} onSearchChange - Handler for changing the search term, debounced by 500ms.
 */
export type PeopleContextType = {
  people: Person[] | undefined,
  filters: Employment[],
  search: string,
  isError?: boolean,
  isLoading?: boolean,
  isSuccess?: boolean,
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PeopleContext = createContext<PeopleContextType>({
  people: undefined,
  filters: [], 
  search: "",
  onFilterChange: () => {},
  onSearchChange: () => {}
});

type ContextProviderProps = {
  children?: ReactNode
}

/**
 * Provides context for managing people data, including search and filter functionalities.
 * 
 * @param {React.ReactNode} props.children - The child components that will have access to the context.
 * @returns {JSX.Element} The context provider component.
 */
export function PeopleContextProvider({ children }: ContextProviderProps): JSX.Element {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Employment[]>([]);

  const { data: people, isError, isSuccess, isPending: isLoading } = useFetchPeople(search, filters);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const value = e.target.value as Employment;

    setFilters(prevFilters => (
      checked 
        ? [...prevFilters, value] 
        : prevFilters.filter((filter) => filter !== value)
    ));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setSearch(name);
  };
  
  // Debounce the search change handler to prevent excessive API calls
  const debouncedSearchChange = useMemo(() => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e), 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel();
    };
   }, [debouncedSearchChange]);

  const contextValue = {
    people,
    filters,
    search,
    isError,
    isLoading,
    isSuccess,
    onFilterChange: handleFilterChange,
    onSearchChange: debouncedSearchChange
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
}
