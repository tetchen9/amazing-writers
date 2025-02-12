import { ReactElement } from "react";
import { LinkPlayground } from "@/ui-kit/link-playground";
import IconUser from "@/theme/icons/user.svg?react";
import { Button } from "@/ui-kit/button";
import PeopleTable from "./people-table";
import { Container, PageHeader } from "./page.styles";
import { SearchCard } from "./search-card";
import { TableTitle } from "./table-title";

/**
 * PeoplePage component renders the page for displaying and managing people.
 * Its header has a title, a number of people, a button to add new members.
 * It has a search card with filtering and search functionality and a table to display people.
 *
 * @returns {ReactElement} The rendered PeoplePage component.
 */
export const PeoplePage = (): ReactElement => {
  const addMemberBtnText = "Add writer";

  return (
    <Container>
      <PageHeader>
        <TableTitle />
        <Button
          as='a'
          to='/people/new'
          $icon={<IconUser aria-label='Member icon'/>} 
          aria-label={addMemberBtnText}
        >
          {addMemberBtnText}
        </Button>
      </PageHeader>
      <SearchCard />
      <PeopleTable />
      <LinkPlayground />
    </Container>
  );
};
