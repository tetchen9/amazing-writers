import { render, screen, waitFor } from "@testing-library/react";
import { PeopleContextProvider } from "./people-page-context";
import { useFetchPeople } from "@/hooks/use-fetch-people";
import { MockedFunction, vi } from "vitest";
import { usePeopleContext } from "./use-people-context";
import { mockPeople } from "@/test/mock-people";

vi.mock("@/hooks/use-fetch-people");

const mockUseFetchPeople = useFetchPeople as MockedFunction<typeof useFetchPeople>;

const result = {
  data: mockPeople,
  isLoading: false,
  isError: false,
  refetch: vi.fn(),
};

describe("PeopleContextProvider", () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  const TestComponent = () => {
    const { people, isError, isLoading } = usePeopleContext();
    if (isError) return null;
    if (isLoading) return <div>Loading...</div>;
    return <div>{people?.map(person => person.name).join(", ")}</div>;
  };

  it("provides people data to its children", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockUseFetchPeople.mockReturnValueOnce(result as any); 
    mockUseFetchPeople.mockReturnValueOnce(result as any); 
    render(
      <PeopleContextProvider>
        <TestComponent />
      </PeopleContextProvider>
    );

    await waitFor(() => {
      const names = screen.getByText("Lesya Ukrainka, Ivan Franko, Taras Shevchenko");
      expect(names).toBeInTheDocument();
    });
  });

});
