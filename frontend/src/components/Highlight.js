import React from 'react';
import styled from 'styled-components';

const HighlightWrapper = styled.span`
	background: #ddd;
	border-radius: 5px;
	border: 1px solid black;
	padding: 0 2px;
	color: black;
	height: fit-content;
`;

const Highlight = ({ text }) => <HighlightWrapper>{ text }</HighlightWrapper>;

export default Highlight;
