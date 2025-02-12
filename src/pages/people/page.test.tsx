
import { render, screen, userEvent } from "@/test/utils";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { waitFor } from "@testing-library/react";
import MockAdapter  from "axios-mock-adapter";
import { PeopleContextProvider } from "@/context/people-page-context";
import { mockPeople } from "@/test/mock-people";
import appConfig from "@/config";
import { useTableQueryClient } from "@/hooks/query-client";
import { PeoplePage } from "./page";

const mockAxios = new MockAdapter(axios);

mockAxios.onGet(`${appConfig.baseAPIUrl}/people`)
  .reply(200, mockPeople);
mockAxios.onGet(`${appConfig.baseAPIUrl}/people?name_like=ann`)
  .reply(200, [mockPeople[0]]);
mockAxios.onGet(`${appConfig.baseAPIUrl}/people?employment=poet`)
  .reply(200, [mockPeople[1]]);
mockAxios.onGet(`${appConfig.baseAPIUrl}/people?employment=prosewriter`)
  .reply(200, [mockPeople[0], mockPeople[2]]);
mockAxios.onGet(`${appConfig.baseAPIUrl}/people?name_like=ann&employment=poet`)
  .reply(200, []);

afterAll(() => {
  mockAxios.restore();
});

vi.mock("@/theme/icons/user.svg?react", () => ({
  default: () => <svg data-testid="user-icon" />,
}));

Object.defineProperty(window, "matchMedia", {
  value: vi.fn(),
});

describe("PeoplePage", () => {

  describe("PeoplePage without data", () => {
    it("should render the PeoplePage component, have a header and no member number", () => {
      render(
        <BrowserRouter>
          <PeoplePage />
        </BrowserRouter>
      );
      const heading = screen.getByRole("heading", { name: /Ukrainian Writers/i });
      expect(heading).toBeInTheDocument();
      const membersNumber = screen.queryByTestId("members-number");
      expect(membersNumber).not.toBeInTheDocument();
    });

    it("should have a link to Add writer page", async () => {
      render(
        <BrowserRouter>
          <PeoplePage />
        </BrowserRouter>
      );

      const link = screen.getByRole("link", {name: /Add writer/i});
      expect(link).toHaveAttribute("href", "/people/new");
      await userEvent.click(link);
      expect(window.location.pathname).toBe("/people/new");
    });

    it("should render the PeoplePage component, have a table and search fields", () => {
      render(
        <BrowserRouter>
          <PeoplePage />
        </BrowserRouter>
      );
      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
      const searchCard = screen.getByRole("searchbox");
      expect(searchCard).toBeInTheDocument();
      const filter = screen.getByRole("checkbox", { name: /Filter by poet/i });
      expect(filter).toBeInTheDocument();
    });
  });

  describe("PeoplePage search and filter behaviour", () => {

    const renderWithPeopleContext = (ui: ReactNode ) => {
      const queryClient = useTableQueryClient();

      return render(
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <PeopleContextProvider>
              {ui}
              <Toaster />
            </PeopleContextProvider>
          </QueryClientProvider>
        </BrowserRouter>
      );
    };

    it("should render the table with data", async() => {
      renderWithPeopleContext(<PeoplePage />);
      await waitFor(() => [
        expect(screen.queryByTestId("members-number")).toHaveTextContent("3 members"),
        expect(screen.getAllByRole("row").length).toBe(4),
        expect(screen.getByText("Lesya Ukrainka")).toBeInTheDocument(),
        expect(screen.getByText("Ivan Franko")).toBeInTheDocument(),
      ], { timeout: 500 });
    });

    it("should search the table", async() => {
      renderWithPeopleContext(<PeoplePage />);
      const searchBox = screen.getByRole("searchbox", { name: /Search by name/i });
      expect(searchBox).toBeInTheDocument();
      await userEvent.type(searchBox, "ann");
      await waitFor(() => [
        expect(screen.queryByTestId("members-number")).toHaveTextContent("1 member"),
        expect(screen.getAllByRole("row").length).toBe(2) ,
        expect(screen.getByText("Lesya Ukrainka")).toBeInTheDocument(),
        expect(screen.queryByText("Ivan Franko")).not.toBeInTheDocument()
      ], { timeout: 1000 });
    });

    it("should filter the table my employemt poet", async() => {
      renderWithPeopleContext(<PeoplePage />);
      const filter = screen.getByRole("checkbox", { name: /Filter by poet/i });
      expect(filter).toBeInTheDocument();
      await userEvent.click(filter);
      await waitFor(() => [
        expect(screen.getAllByRole("row").length).toBe(2) ,
        expect(screen.queryByText("Lesya Ukrainka")).not.toBeInTheDocument(),
        expect(screen.queryByText("Ivan Franko")).toBeInTheDocument()
      ], { timeout: 500 });
    });

    it("should filter the table by employmet prosewriter", async() => {
      renderWithPeopleContext(<PeoplePage />);
      const filter = screen.getByRole("checkbox", { name: /Filter by prosewriter/i });
      expect(filter).toBeInTheDocument();
      await userEvent.click(filter);
      await waitFor(() => [
        expect(screen.getAllByRole("row").length).toBe(3) ,
        expect(screen.queryByText("Lesya Ukrainka")).toBeInTheDocument(),
        expect(screen.queryByText("Ivan Franko")).not.toBeInTheDocument(),
        expect(screen.queryByText("Taras Shevchenko")).toBeInTheDocument()
      ], { timeout: 500 });
    });

    it("should search by name and filter the table", async() => {
      renderWithPeopleContext(<PeoplePage />);

      const filter = screen.getByRole("checkbox", { name: /poet/i });
      await userEvent.click(filter);

      const searchBox = screen.getByRole("searchbox", { name: /Search by name/i });
      await userEvent.type(searchBox, "ann");

      await waitFor(() => [
        expect(screen.queryByTestId("members-number")).toHaveTextContent("0 members"),
        expect(screen.getAllByRole("row").length).toBe(1) ,
        expect(screen.queryByText("Lesya Ukrainka")).not.toBeInTheDocument(),
        expect(screen.queryByText("Ivan Franko")).not.toBeInTheDocument(),
      ], { timeout: 1200 });
    });

    it("should show an error toaster when the API call returns an error", async() => {
      mockAxios.onGet(`${appConfig.baseAPIUrl}/people`).reply(403);

      renderWithPeopleContext(<PeoplePage />);

      await waitFor(() => {
        const errorToast = screen.getByTestId("error-toast");
        return [
          expect(errorToast).toBeInTheDocument(),
          expect(errorToast).toHaveTextContent("Sorry, something went wrong"),
        ];}, { timeout: 500 });
    });

    it("should show an error toaster when the API call times out", async() => {
      mockAxios.onGet(`${appConfig.baseAPIUrl}/people`).timeout();

      renderWithPeopleContext(<PeoplePage />);

      await waitFor(() => {
        const errorToast = screen.getByTestId("error-toast");
        return [
          expect(errorToast).toBeInTheDocument(),
          expect(errorToast).toHaveTextContent("Sorry, something went wrong"),
        ];}, { timeout: 500 });
    });

    it("should show a loader icon while data is loading", async() => {
      mockAxios.onGet(`${appConfig.baseAPIUrl}/people`)
        .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, mockPeople]), 100)));

      renderWithPeopleContext(<PeoplePage />);
      expect(screen.getByTestId("table-loading-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("members-number")).not.toBeInTheDocument();
      expect(screen.getAllByRole("row").length).toBe(1);

      await waitFor(() => [
        expect(screen.queryByTestId("members-number")).toHaveTextContent("3 members"),
        expect(screen.getAllByRole("row").length).toBe(4),
      ], { timeout: 500 });
    });
  });

});
