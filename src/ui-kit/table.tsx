import { ComponentPropsWithoutRef, ReactElement } from "react";
import styled from "styled-components";
import { CSS } from "styled-components/dist/types";

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0 0;
  ${({ theme }) => theme.typography.bodySmall};
  color: ${({ theme }) => theme.color.table.row.text};

  thead {
    border-bottom: 4px solid ${({ theme}) => theme.color.table.header.border};
  }

  @media ${({theme}) => theme.device.tablet} {
    table-layout: fixed;
  }
`;

export const TableRow = styled.tr``;

type CellProps = {
  /**
   * Align text content of a cell.
   * This is different than the "align" HTML attribute.
   * Even though the "align" attribute is available out of the box,
   * we should not use it as it is deprecated.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#align
   */
  $textAlign?: CSS.Property.TextAlign
};

export const TableThCell = styled.th<CellProps>`
  padding: 16px 0 16px 20px;
  color:${({ theme }) => theme.color.table.header.text};
  background-color:${({ theme }) => theme.color.table.header.background};
  text-align: ${({ $textAlign }) => $textAlign ?? "left"};
  ${({ theme }) => theme.typography.tableHeader};
  text-transform: uppercase;
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    padding-right: 20px;
    border-top-right-radius: 10px;
  }
  
`;

export const TableCell = styled.td<CellProps>`
  height: 55px;
  padding: 8px 0 8px 20px;
  border-top: 1px solid${({ theme }) => theme.color.table.row.border}; 
  border-radius: 0;
  text-align: ${({ $textAlign }) => $textAlign ?? "left"};
  background-color:${({ theme }) => theme.color.table.row.background};
  
  &:last-child {
    padding-right: 20px;
  }

  ${TableRow}:first-child & {
    border-top: 0;
  }

  ${TableRow}:last-child & {
    &:first-child {
      border-bottom-left-radius: 10px;
    }
    &:last-child {
      border-bottom-right-radius: 10px;
    }
  }
`;

export const TableLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 166px;
  background-color:${({ theme }) => theme.color.table.row.background};
`;

type Props = ComponentPropsWithoutRef<"table">

/**
 * A functional component that renders a table within a styled container.
 *
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the table.
 * @returns {ReactElement} The rendered table component.
 */
export const Table = (props: Props): ReactElement => {
  const { children, ...rest } = props;

  return (
    <TableContainer>
      <StyledTable {...rest}>
        {children}
      </StyledTable>
    </TableContainer>
  );

};
