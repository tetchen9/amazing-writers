import { ReactElement, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AddEditPeoplePage } from "@/pages/add-edit-people";
import { PeoplePage } from "@/pages/people/page";
import { PlaygroundPage } from "@/pages/playground";
import { PeopleContextProvider } from "@/context/people-page-context";
import { useTableQueryClient } from "@/hooks/query-client";
import { ThemeProvider } from "@/theme/provider";
import { AppHeader } from "./header";

/**
 * The main application component that sets up the context providers, routing, and theming for the app.
 *
 * @returns {ReactElement} The rendered application component.
 *
 * @remarks
 * This component uses several context providers to manage state and theming:
 * - `ThemeProvider` for theming.
 * - `QueryClientProvider` for managing state with React Query.
 * - `PeopleContextProvider` for keeping the people-related properties.
 *
 * The component also sets up routing using `BrowserRouter` and defines several routes.
 * A `Toaster` component is included for displaying toast notifications.
 */
export const App = (): ReactElement => {
  const [queryClient] = useState(useTableQueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppHeader />
          <PeopleContextProvider>
            <Routes>
              <Route index element={<PeoplePage />} />
              <Route path="/people/new" element={<AddEditPeoplePage />} />
              <Route path="/people/edit/:id" element={<AddEditPeoplePage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PeopleContextProvider>
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
