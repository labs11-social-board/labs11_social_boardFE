import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { deleteAccount } from '../store/actions/index.js';

const DeleteAccountModalWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	overflow: auto;
	z-index: 2;
`;

const DeleteBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	flex-direction: column;
	background-color: #C9C19F;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid black;
	width: 300px;

	p {
		color: #b30000;
		font-weight: 700;
		text-align: center;
		margin: 10px;
	}
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
`;

const DeleteAccountModal = ({ toggleDeleteModal, deleteAccount }) => {
	return(
		<DeleteAccountModalWrapper>
			<DeleteBox>
				<p>Are you sure you want to delete your account? This is permanent and not reversible.</p>
				<Buttons>
					<button onClick = { toggleDeleteModal }>No</button>
					<button onClick = { deleteAccount }>Yes</button>
				</Buttons>
			</DeleteBox>
		</DeleteAccountModalWrapper>
	);
};

export default connect(null, { deleteAccount })(DeleteAccountModal);
