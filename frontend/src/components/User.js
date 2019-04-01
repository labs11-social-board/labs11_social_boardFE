import React from 'react';
import styled from 'styled-components';

const User = ({ user, inviteUser }) => {
  return (
    <div className='user-wrapper' onClick={e => inviteUser(e, user.id)}>
      <h2>{user.username}</h2>
    </div>
  );
};

export default User;