import React from 'react';
import styled from 'styled-components';

const UserWrapper = styled.div`
  cursor:pointer;

  &:hover {
    background: grey;
    border-radius: 3px;
    color:white;
  }
`;

const User = ({ user, inviteUser }) => {
  return (
    <UserWrapper onClick={e => inviteUser(e, user.id)}>
      <h2>{user.username}</h2>
    </UserWrapper>
  );
};

export default User;