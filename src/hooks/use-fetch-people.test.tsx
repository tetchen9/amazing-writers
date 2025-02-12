
import { render, screen } from "@/test/utils";
import { mockPeople } from "@/test/mock-people";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFetchPeopleRequestParams, useFetchPeople } from "./use-fetch-people";
import { type Employment } from "@/types/employment";

const queryClient = new QueryClient();

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...actual as any,
    useQuery: vi.fn(() => ({ isLoading: false, data: mockPeople }))
  };
});

export const TestComponent = () => {
  const { data } = useFetchPeople();

  if (!data) return null;
  return (
    <ul data-testid='list'>
      {data.map(({name}) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

describe("useFetchPeople", () => {
  it("should fetch people", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );
    expect(screen.getByTestId("list")).toBeInTheDocument();
    expect(screen.getByText("Lesya Ukrainka")).toBeInTheDocument();
    expect(screen.getByText("Ivan Franko")).toBeInTheDocument();
  });
});

describe("getRequestUrl", () => {
  it("should return the correct url", () => {
    const url = getFetchPeopleRequestParams();
    expect(url).toBe("");
  });

  it("should return the correct url with query", () => {
    const url = getFetchPeopleRequestParams("ann");
    expect(url).toBe("?name_like=ann");
  });

  it("should return the correct url with query and employment", () => {
    const url = getFetchPeopleRequestParams("ann", ["prosewriter" as Employment]);
    expect(url).toBe("?name_like=ann&employment=prosewriter");
  });

  it("should return the correct url with employment", () => {
    const url = getFetchPeopleRequestParams(undefined, ["poet" as Employment]);
    expect(url).toBe("?employment=poet");
  });

  it("should sanitise the name", () => {
    const url = getFetchPeopleRequestParams("&Lesya Ukrainka?&=");
    expect(url).toBe("?name_like=Lesya+Ukrainka");
  });
});
