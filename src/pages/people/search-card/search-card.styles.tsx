import { Card } from "@/ui-kit/card";
import styled from "styled-components";

export const StyledSearchCard = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  >:nth-child(1) {
    width: 100%;
  }

  @media ${({theme}) => theme.device.tablet} {
    flex-wrap: nowrap;

    >:nth-child(1) {
      width: auto;
    }

    >:nth-child(2) {
      margin-left: auto;
    }
  }
`;
