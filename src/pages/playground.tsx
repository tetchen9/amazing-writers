import { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import IconSearch from "@/theme/icons/search.svg?react";
import IconTimesCircle from "@/theme/icons/times-circle.svg?react";
import IconTrash from "@/theme/icons/trash.svg?react";
import IconUser from "@/theme/icons/user.svg?react";
import { Button } from "@/ui-kit/button";
import { Card, CardBody, CardFooter, CardHeader } from "@/ui-kit/card";
import { LoadingLogo } from "@/ui-kit/loading-logo";
import { Table, TableCell, TableRow, TableThCell } from "@/ui-kit/table";
import { Text } from "@/ui-kit/text";
import { Toast } from "@/ui-kit/toast/toast";
import { Filter } from "@/ui-kit/filter";
import { SearchInput } from "@/ui-kit/search-input";

const Container = styled.main`
  margin: 40px auto;
  width: 100%;
  max-width: var(--layout-width);
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-family: "Courier New", Courier, monospace;
  font-weight: 600;
  margin: 24px 0 0;
  padding-top: 24px;
  border-top: 1px solid ${({ theme: color}) => color.mischka};
`;

const Demo = styled.main`
  padding: 16px 0 32px;

  > *+* {
    margin: 0 8px;
  }
`;
const ToastContainer = styled.div`&&&{
  max-width: 338px;

  > * {
    margin: 10px 0;
  }
}`;

export const PlaygroundPage = (): ReactElement => {
  return (
    <Container>
      <Text $variant="h1" as="h1">
        Playground
      </Text>

      <Text as="p" color="lynch">
        These are some of the base components already built for you. You can{" "}
        <Text $variant="bodyBold">use and modify</Text> them as you need!
      </Text>
      <Link to="/">Go Home</Link>

      <Title>{"<Text>"}</Title>
      <Demo>
        <Text as="p" $variant="body">
          Everyday is a <Text $variant="bodyBold">new opportunity</Text> to
          grow.
        </Text>
      </Demo>

      <Title>{"<Button>"}</Title>
      <Demo>
        <Button $variant='primary'>Continue</Button>
        <Button $variant='secondary'>Continue</Button>
        <Button $variant='default'>Continue</Button>
      </Demo>

      <Title>{"<Filter>"}</Title>
      <Demo>
        <Filter label='poet' value='poet' onChange={() => {}}></Filter>
      </Demo>

      <Title>{"<SearchInput>"}</Title>
      <Demo>
        <SearchInput placeholder='type here' onChange={() => {}}></SearchInput>
      </Demo>

      <Title>{"<Card>"}</Title>
      <Demo>
        <Card>
          <CardHeader>Start with the CardHeader</CardHeader>
          <CardBody>This is the CardBody</CardBody>
          <CardFooter>And this is the CardFooter</CardFooter>
        </Card>
      </Demo>

      <Title>{"<Table>"}</Title>
      <Demo>
        <Table>
          <thead>
            <tr>
              <TableThCell>prosewriter Name</TableThCell>
              <TableThCell>Country</TableThCell>
              <TableThCell $textAlign="right">Salary</TableThCell>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <TableCell>Ana Morgado</TableCell>
              <TableCell>Portugal</TableCell>
              <TableCell $textAlign="right">EUR 5.000,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kate Will</TableCell>
              <TableCell>United States</TableCell>
              <TableCell $textAlign="right">USD 10,000,00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pierre Clark</TableCell>
              <TableCell>France</TableCell>
              <TableCell $textAlign="right">EUR 3.000,00</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </Demo>

      <Title>{"<LoadingLogo>"}</Title>
      <Demo>
        <LoadingLogo />
      </Demo>

      <Title>Icons</Title>
      <Demo>
        <IconSearch />
        <IconTrash />
        <IconTimesCircle />
        <IconUser />
      </Demo>

      <Title>{"<Toast>"}</Title>
      <Demo>
        <ToastContainer>
          <Toast $variant='success' onClose={() => {}}/>
          <Toast onClose={() => {}}/>
        </ToastContainer>
      </Demo>
    </Container>
  );
};
