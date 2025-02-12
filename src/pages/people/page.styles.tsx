import styled from "styled-components";
import { CardBody } from "@/ui-kit/card";

export const Container = styled.main`
  margin: 40px auto;
  padding: 0 16px;
  width: 100%;
  max-width: var(--layout-width);
`;

export const PageHeader = styled(CardBody)`
  display: flex;
  padding: 0 0 32px;
  align-items: center;
  justify-content: space-between;

  flex-wrap: wrap;
  
  >* {
    white-space: nowrap;
  }

  @media ${({theme}) => theme.device.tablet} {
    flex-wrap: nowrap;
  }
`;
