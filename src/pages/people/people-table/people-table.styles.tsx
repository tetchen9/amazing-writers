import styled from "styled-components";
import { TableCell, TableThCell } from "@/ui-kit/table";
import { Text } from "@/ui-kit/text";

export const StyledTableThCell = styled(TableThCell)`
  &:last-child {
    border-top-right-radius: 0;
  }

  &:first-child {
    border-top-left-radius: 0;
  }
`;

export const NameTableCell = styled(TableCell)`
  color: ${({ theme }) => theme.color.darkBlue};
  ${({ theme }) => theme.typography.bodySmallMedium};
`;

export const MoneyTableCell = styled(TableCell).attrs({
  $textAlign: "right"
})`
  white-space: nowrap;
`;

export const NoMembersText = styled(Text).attrs({
  $variant: "bodySmall"
})`
  display: block;
  width: 100%;
  padding: 20px 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${({ theme }) => theme.color.table.row.background};
  text-align: center;
`;
