import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { displayMessage } from '../store/actions/index.js';

const MessageWrapper = styled.div`
	background-color: ${props => props.theme.messageWrapperBgColor};
	position: absolute;
	top: 0;
	z-index: 80001;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: center;
`;

const MessageBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: ${props => props.theme.settingsBgColor};
	margin-top: 40vh;
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

const Message = ({ message, displayMessage, isDay }) => {
	return(
		<MessageWrapper>
			<MessageBox isDay = { isDay }>
				<span
					className='back'
					onClick={() => displayMessage('')}		
				><i className="far fa-arrow-alt-circle-left"></i></span>
				<p>{ message }</p>
			</MessageBox>
		</MessageWrapper>
	);
};

const mapStateToProps = state => ({
	isDay: state.users.isDay,
});

export default connect(mapStateToProps, { displayMessage })(Message);
