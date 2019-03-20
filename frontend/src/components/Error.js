import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { displayError } from '../store/actions/index.js';

const ErrorWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.errorWrapperBgColor};
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	overflow: auto;
	z-index: 9999;
`;

const ErrorBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: ${props => props.theme.settingsBgColor};
	padding: 10px;
	border-radius: 5px;
	border: 1px solid ${props => props.theme.settingsBgColor};
	width: 300px;
	position: relative;

	.back {
		font-size: 30px;
		color: ${ ({ isDay }) => isDay ? '#444' : '#ddd' };
		position: absolute;
		top: 12px;
		left: 15px;

		&:hover {
			cursor: pointer;
			color: ${props => props.theme.defaultColorOnHover};
		}
	}

	p {
		color: ${ ({ isDay }) => isDay ? '#444' : '#ddd' };
		font-weight: 700;
		text-align: justify;
		margin: 10px;
		margin-top: 45px;
	}
`;

const Error = ({ error, displayError, isDay }) => {
	return(
		<ErrorWrapper>
			<ErrorBox isDay = { isDay }>
				<span
					className='back'
					onClick={() => displayError('')}		
				><i className="far fa-arrow-alt-circle-left"></i></span>
				<p>{ error }</p>
			</ErrorBox>
		</ErrorWrapper>
	);
};

const mapStateToProps = state => ({
	isDay: state.users.isDay,
});

export default connect(mapStateToProps, { displayError })(Error);
