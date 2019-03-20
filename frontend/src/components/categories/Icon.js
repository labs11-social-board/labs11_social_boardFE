import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.div`
	padding: 10px;
	border: 1px solid ${ ({ selected }) => selected ? 'blue' : 'black' };
	border-radius: 5px;
	margin: 10px;
	height: 18px;
	width: 18px;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: #ddd;
		cursor: pointer;
	}
`;

const Icon = ({ icon, selectedIcon, setIcon }) => {
	const handleClick = () => setIcon(icon);
	return(
		<IconWrapper
			onClick = { handleClick }
			selected = { icon === selectedIcon }
		>
			<i className = { icon } />
		</IconWrapper>
	);
};

export default Icon;
