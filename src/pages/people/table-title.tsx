import { usePeopleContext } from "@/context/use-people-context";
import { formatMembersNumber } from "@/service/formatting-utils";
import { themeColor } from "@/theme/color";
import { Text } from "@/ui-kit/text";
import styled from "styled-components";

export const StyledTableTitle = styled.main`
  display: flex;
  gap: .5rem;
  align-items: baseline;
`;

export const TableTitle = () => {
  const { people } = usePeopleContext();

  return (
    <StyledTableTitle>
      <Text $variant='h1' as='h1'>
        Ukrainian Writers
      </Text>
      {!!people && (
        <Text $variant='bodySmall' color={themeColor.bayoux} data-testid='members-number'>
          {formatMembersNumber(people.length)}
        </Text>
      )}
    </StyledTableTitle>
  )
}