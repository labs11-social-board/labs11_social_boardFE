import React from 'react';
import styled from 'styled-components';

const StyledDeleted = styled.span`
	color: gray;
	font-style: italic;
`;

const Deleted = () => <StyledDeleted>deleted</StyledDeleted>;

export default Deleted;
