import { render, screen, userEvent } from "@/test/utils";
import { describe, it, expect } from "vitest";
import { SearchCard } from ".";
import { employments } from "@/types/employment";
import { EmploymentLabels } from "../employment-labels";
import { PeopleContext, PeopleContextType } from "@/context/people-page-context";
import { ReactNode } from "react";

const renderWithPeopleContextProvider = (
  ui: ReactNode, 
  handleFilterChange: () => void,
  handleSearchChange: () => void,
) => {
  const providerProps: PeopleContextType = {
    people: [],
    filters: [],
    search: "",
    onFilterChange: handleFilterChange,
    onSearchChange: handleSearchChange,
  };

  return render(
    <PeopleContext.Provider value={providerProps}>{ui}</PeopleContext.Provider>
  );
};

describe("SearchCard", () => {
  it("should display the search input with icon in the background", () => {
    render(<SearchCard />);
    const inputElement = screen.getByRole("searchbox", { name: /Search by name/i });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", "Search by name...");
  });

  it("should display the correct number of checkboxes", () => {
    render(<SearchCard />);
    const checkboxElements = screen.getAllByRole("checkbox");
    expect(checkboxElements).toHaveLength(employments.length);
  });

  it("should display the correct labels for the checkboxes", () => {
    render(<SearchCard />);
    const checkboxElements = screen.getAllByRole("checkbox");
    checkboxElements.forEach((checkbox, index) => {
      expect(checkbox.parentElement).toHaveTextContent(EmploymentLabels[employments[index]]);
    });
  });

  it("should call the onChange function when a checkbox is clicked", async () => {
    const handleFilterChange = vi.fn();
    renderWithPeopleContextProvider(<SearchCard />, handleFilterChange, () => {});
    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[1]);
    expect(handleFilterChange).toHaveBeenCalledTimes(2);
  });

  it("should call the onChange function when the search input is changed", async () => {
    const handleSearchChange = vi.fn();
    renderWithPeopleContextProvider(<SearchCard />, () => {}, handleSearchChange);
    const inputElement = screen.getByRole("searchbox");
    const firstName = "Anna";
    await userEvent.type(inputElement, firstName);
    expect(handleSearchChange).toHaveBeenCalled();
    expect(handleSearchChange).toHaveBeenCalledTimes(firstName.length);
  });

});
