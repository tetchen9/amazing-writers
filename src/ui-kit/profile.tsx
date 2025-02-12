import { Text } from "@/ui-kit/text";
import { ReactElement } from "react";
import styled from "styled-components";

const Link = styled.a`
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 1rem;
  transition: box-shadow 250ms ease;

  &:hover,
  &:focus {
    outline: none;
    text-decoration: none;
    box-shadow: 0 0 3px${({ theme }) => theme.color.irisBlue};
  }
`;

const Avatar = styled.img`
  display: block;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background-color:${({ theme }) => theme.color.cosmos};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  line-height: 1.3;
`;

export const Profile = (props: {
  name: string;
  role: string;
  picUrl?: string;
}): ReactElement => {
  const { name, picUrl, role } = props;

  return (
    <Link href="#profile-page">
      {picUrl !== undefined && <Avatar src={picUrl} alt="Profile picture" />}
      <Info>
        <Text $variant="bodyMedium">{name}</Text>
        <Text $variant="bodyCaption" color="lynch">
          {role}
        </Text>
      </Info>
    </Link>
  );
};
