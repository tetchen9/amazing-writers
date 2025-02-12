import { ReactElement, useState } from "react";
import { SearchInput } from "@/ui-kit/search-input";
import { Employment, employments } from "@/types/employment";
import { EmploymentLabels } from "../employment-labels";
import { usePeopleContext } from "@/context/use-people-context";
import { StyledSearchCard } from "./search-card.styles";
import { Filter } from "@/ui-kit/filter";

/**
 * SearchCard component renders a search input and a list of filters for searching people.
 * 
 * @returns {ReactElement} The rendered search card component.
 * 
 * @remarks
 * This component uses the `usePeopleContext` hook to access the current search value, filters,
 * and their respective change handlers. It maintains a local state for the search input value
 * to provide a controlled input element.
 */
export const SearchCard = (): ReactElement => {
  const { filters, search, onFilterChange, onSearchChange } = usePeopleContext();
  const [localSearchValue, setLocalSearchValue] = useState(search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);
    onSearchChange(e);
  };

  const filterList = employments.map((employment: Employment) => 
    <Filter
      label={EmploymentLabels[employment]} 
      value={employment}
      key={employment}
      checked={filters.includes(employment)} 
      onChange={onFilterChange} 
    />
  );

  return (
    <StyledSearchCard>
      <SearchInput 
        placeholder='Search by name...' 
        onChange={handleSearchChange} 
        aria-label='Search by name'
        value={localSearchValue}
      />
      {filterList}
    </StyledSearchCard>
  );
};
