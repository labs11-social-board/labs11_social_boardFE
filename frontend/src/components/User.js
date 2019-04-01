import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';

const UserWrapper = styled.div`
  display:flex;
  align-items:center;
  cursor:pointer;
  
  &:hover {
    background: grey;
    border-radius: 3px;
    color:white;
  }

  h2{
    margin-left:7%;
  }
`;

const User = ({ user, inviteUser }) => {
  return (
    <UserWrapper onClick={e => inviteUser(e, user.id)}>
      <Avatar height='50px' width='50px' src={ user.avatar }/>
      <h2>{user.username}</h2>
    </UserWrapper>
  );
};

export default User;