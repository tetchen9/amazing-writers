
This project implements a table with a Search and Filtering features.

### Implementation details
Query management
API calls are managed by React Query. React Query makes it easier to manage asynchronous operations, handle loading and error states, it improves the performance, caches data. A useQuery custom hook fetches a list of people based on the provided name and employment. The QueryClient is configured to handle the error response. API calls are made by axios library.

<img width="1101" alt="image" src="https://github.com/user-attachments/assets/2a242063-9cea-4fc5-8ba1-51ada96c0917" />


React Context API is used for sharing data between multiple components. PeopleContextProvider provides context for managing people data, search and filter parameters. A custom hook usePeopleContext is used in People Table, Search Panel and the People Page to access the PeopleContext.

PeopleTable gets an array of people and the state of the API response (the state can be isLoading, isSuccess and isError) and displays the table accordingly to the status. While the data is being loaded, a loading icon is displayed.

Once the data is successfully fetched, the table will be re-rendered with new data.
The page header shows the number of people returned by the API call.

The Search bar uses the usePeopleContext hook to access the current search value, filters, and their respective change handlers. It maintains a local state for the search input value to provide a controlled input element, so that the value is displayed after the user navigates away from the page and returns (for example, clicks on 'Add writer' link and then comes back to the page with the table). The Search field onChange handler gets debounced to reduce the amount of API calls. The debounce is wrapped in the useMemo hook to avoid unnecessary recreation of the function on every render.

The data shown in the table matches the filter/name values, except for when there's a failed request. In the case of an API error a toast notification is shown and the table shows the data for the last successful request. I'm not sure what is the expected behavior there, this might need to be updated to show an empty table and a toast to avoid potential confusion.
The search string is sanitized before the call is made to avoid errors like Invalid regular expression.

## Additional libraries used:
@tanstack/react-query - for managing API calls and returned response
axios - for making API calls to fetch the list of people
lodash.debounce - for debouncing user input on the search field to reduce the amount of calls
react-hot-toast - for showing toast notifications when there is an error, can be used for other notifications in the future.
axios-mock-adapter - for mocking the API calls when testing features
Components created/updated
PeopleTable: displays a list of people with their details, several columns have custom styling. Data is formatted: totalSales is displayed in a given format, employment is mapped to labels, the name column has updated styling. The table is responsive and will be readable on a mobile screen.
SearchInput: a search input component that renders a styled input element with type 'search'.
Button: a component with the styling of a button, can be rendered as a Button or as an Anchor and have react-router-dom Link behavior. Styling can be one of three variants. The button can have an icon, on mobile screen
Filter: a labeled checkbox, used for filtering people by employment.
Toast: a custom toast notification to show onError of an API call, can be also used for onSuccess in the future.
Added components are accessible to screen readers.
All new components, hooks, context, utils and services are covered with unit-tests.

## De-scoped:
Table pagination/infinite scrolling.
Updating the current URL with search and filter parameters
Using spacing variables to ensure consistent margins/paddings. The theme file was added to illustrate one of the ways it could be done, but it's used only in a couple of places.
Art direction for screen-sizes between mobile and tablet breakpoints.
Proper elsint configuration, I added only minimal linting.
Covering existing React components with unit tests.
Cypress tests
A complete Storybook

## The project

### Getting started

The required node.js and NPM versions are defined at the `package.json` file.
The project follows a typical process to run at your local:

1. Clone this repository
2. Install the dependencies with `npm install`
3. Start the app with `npm run dev`

### Tech stack

**This list is only for reference.**
- [JSON Server](https://github.com/typicode/json-server)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com)
- [React Router](https://reactrouter.com/en/main)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [React](https://react.dev/)
- [Styled Component](https://styled-components.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)

### Project structure

```bash
src/
  app # App root of all user interfaces
  pages # App router
  test # Test setup and utilities
  theme # Theme utilities such as colors and typography
  types # Types for external, server-side models
  ui-kit # Common components to be used widely
```

**Once again, you have total freedom to modify this codebase.**
You can re-organize it, introduce new patterns, and/or add any tools you want.

### Available commands

- **`dev`: Start the local servers.**
  This starts both (1) the Vite app server and (2) the JSON mock server in parallel.
- **`test`: Start the test runner in watch mode.**
  You can update the tests and see the results immediately.
- **`health`: Run a check for the project's health.**
  At the moment, it includes Vitest, TypeScript, and ESLint.

### Available endpoints

- `GET http://localhost:4002/people`: get the full list of people
- `GET http://localhost:4002/people?name_like={substring}`: search for people where the name includes `{substring}`
- `GET http://localhost:4002/people?employment={string}`: search for people where the employment type matches `string`
- `GET http://localhost:4002/people?name_like={substring}&employment={string}`: search for people by name and employment type
- `GET http://localhost:4002/people/{id}`: get the person with id `{id}`
- `POST http://localhost:4002/people`: create a new person
- `PATCH http://localhost:4002/people/{id}`: update the person with id `{id}`
- `DELETE http://localhost:4002/people/{id}`: delete the person with id `{id}`
