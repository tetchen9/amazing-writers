import { render, screen } from "@/test/utils";
import { within } from "@testing-library/react";
import PeopleTable from ".";
import { PeopleContext, PeopleContextType } from "@/context/people-page-context";
import { ReactNode } from "react";
import { mockPeople } from "@/test/mock-people";

Object.defineProperty(window, "matchMedia", {
  value: vi.fn(),
});

const renderWithPeopleContextProvider = ( ui: ReactNode, props: Partial<PeopleContextType>) => {
  const { people, isError, isLoading, isSuccess } = props;
  const providerProps: PeopleContextType = {
    people: people || undefined,
    filters: [],
    search: "",
    isError: isError || false,
    isLoading: isLoading || !people,
    isSuccess: isSuccess || people !== null,
    onFilterChange: vi.fn(),
    onSearchChange: vi.fn()
  };

  return render(
    <PeopleContext.Provider value={providerProps}>{ui}</PeopleContext.Provider>
  );
};

describe("PeopleTable", () => {
  it("should render without crashing, have a header", () => {
    render(<PeopleTable />);
    const tableElement = screen.getByRole("table");
    const rows = screen.getAllByRole("row");
    expect(tableElement).toBeInTheDocument();
    expect(rows.length).toBe(1); // header row
    const headerNames = ["Name", "Famous Book", "Type", "City", "Total Sales"];
    headerNames.forEach(expectTextToBeInRow(rows[0]));
  });

  it("should display a loader icon when data is Loading", () => {
    renderWithPeopleContextProvider(<PeopleTable />, { isLoading: true });
    const loadingIcon = screen.getByTestId("table-loading-icon");
    expect(loadingIcon).toBeInTheDocument();
  });

  it("should not display a loader icon when people array is empty", () => {
    renderWithPeopleContextProvider(<PeopleTable />, { people:[], isSuccess: true });
    expect(screen.getByText("No members found")).toBeInTheDocument();
    expect(screen.queryByTestId("table-loading-icon")).not.toBeInTheDocument();
  });

  it("should display the correct number of rows and columns", () => {
    renderWithPeopleContextProvider(<PeopleTable />, { people: mockPeople });
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(4);
    const columns = screen.getAllByRole("columnheader");
    expect(columns.length).toBe(5);
  });

  it("should display the correct data in the table", () => {
    renderWithPeopleContextProvider(<PeopleTable />, { people: mockPeople });
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(4);
    const cellTexts1 = ["Lesya Ukrainka", "Forest Song", "Kyiv", "Poet", "UAH 5.000.000,00 ₴"];
    cellTexts1.forEach(expectTextToBeInRow(rows[1]));
    const cellTexts2 = ["Ivan Franko", "Zakhar Berkut", "Lviv", "ProseWriter", "UAH 15.000.000,00 ₴"];
    cellTexts2.forEach(expectTextToBeInRow(rows[2]));
  });
});

function expectTextToBeInRow(row: HTMLElement): (value: string) => void {
  return (cellText: string) => {
    const cell = within(row).getByText(cellText);
    expect(cell).toBeInTheDocument();
  };
}
