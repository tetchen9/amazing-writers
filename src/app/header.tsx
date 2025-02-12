import styled from "styled-components";
import { Profile } from "../ui-kit/profile";

const Wrapper = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.color.blank};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 auto;
  height: 80px;
  max-width: var(--layout-width);
  padding: ${({ theme: {space} }) => `${space.xxs} ${space.m}`};
`;

export const AppHeader = (): JSX.Element => {
  return (
    <Wrapper>
      <Inner>
        <Profile
          name="Olena Bee"
          role="Librarian"
        />
      </Inner>
    </Wrapper>
  );
};
