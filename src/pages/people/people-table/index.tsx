import { ReactElement } from "react";
import { type Person } from "@/types/person";
import { formatMoney } from "@/service/formatting-utils";
import { LoadingLogo } from "@/ui-kit/loading-logo";
import { Table, TableCell, TableLoading, TableRow } from "@/ui-kit/table";
import { usePeopleContext } from "@/context/use-people-context";
import { MoneyTableCell, NameTableCell, NoMembersText, StyledTableThCell } from "./people-table.styles";
import { EmploymentLabels } from "../employment-labels";

/**
 * PeopleTable component renders a table displaying a collection of people with their details.
 * It uses the `usePeopleContext` hook to fetch the data and handles loading and empty states.
 *
 * @returns {ReactElement} A table with columns for Name, Role, Type, Country, and Salary.
 */
const PeopleTable = (): ReactElement => {
  const { people, isLoading, isSuccess } = usePeopleContext();

  return (<>
    <Table>
      <thead>
        <tr>
          <StyledTableThCell>Name</StyledTableThCell>
          <StyledTableThCell>Famous Book</StyledTableThCell>
          <StyledTableThCell>Type</StyledTableThCell>
          <StyledTableThCell>City</StyledTableThCell>
          <StyledTableThCell $textAlign='right'>Total Sales</StyledTableThCell>
        </tr>
      </thead>
      <tbody>
        {!isLoading && people?.map((person: Person) => (
          <TableRow key={person.id}>
            <NameTableCell>{person.name}</NameTableCell>
            <TableCell>{person.book}</TableCell>
            <TableCell>{EmploymentLabels[person.employment]}</TableCell>
            <TableCell>{person.country}</TableCell>
            <MoneyTableCell>
              {formatMoney(person.totalSales, person.currency)}
            </MoneyTableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
    {isSuccess && !people?.length && (
      <NoMembersText>No members found</NoMembersText>
    )}
    {isLoading && (
      <TableLoading>
        <LoadingLogo data-testid='table-loading-icon'/>
      </TableLoading> 
    )}
  </>);
};

export default PeopleTable;
