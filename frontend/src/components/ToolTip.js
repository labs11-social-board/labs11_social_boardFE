import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToolTipWrapper = styled.span`
	visibility: hidden;
	width: ${ ({ width }) => width ? `${width}px` : '300px' };
	background-color: ${props => props.theme.tooltipWrapperBgColor};
	color: ${props => props.theme.tooltipWrapperColor};
	text-align: center;
	border-radius: 6px;
	padding: 5px;
	position: absolute;
	z-index: 1;
	opacity: 0;
	transition: opacity 0.5s;
	${ ({ arrow, width }) =>
		arrow === 'right' ?
		'top: -14px; right: 200%;'
		:
		arrow === 'left' ?
		'top: -14px; left: 200%;'
		:
		arrow === 'bottom' ?
		`bottom: 135%; left: 25%; margin-left: ${ width ? `calc(${ -width }px / 2)` : '-150px' };`
		:
		null
	}

	&::after {
		content: '';
		position: absolute;
		border-width: 5px;
		border-style: solid;
		${ ({ arrow }) =>
			arrow === 'right' ?
			'top: 50%; left: 100%; margin-top: -5px; border-color: transparent transparent transparent black;'
			:
			arrow === 'left' ?
			'top: 50%; right: 100%; margin-top: -5px; border-color: transparent black transparent transparent;'
			:
			arrow === 'bottom' ?
			'top: 100%; left: 50%; margin-left: -5px; border-color: black transparent transparent transparent;'
			:
			null
		}
	}
`;

const ToolTip = ({ text, arrow, width }) => {
	return <ToolTipWrapper
		className = 'tooltiptext'
		arrow = { arrow }
		width = { width }
		>{ text }</ToolTipWrapper>;
};

ToolTip.propTypes = {
	arrow: PropTypes.string,
	text: PropTypes.string,
	width: PropTypes.number,
};

export default ToolTip;
