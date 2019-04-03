import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { Highlight } from './index.js';

const SearchUserResultWrapper = styled.div`
	border: 1px solid #ddd;
	border-radius: 5px;
	margin: 10px;
	padding-left: 10px;
	padding-right: 10px;

	&:hover {
		cursor: pointer;
		background-color: #ccc;
		color: black;

		.created {
			color: black;
		}
	}

	.category-wrapper {
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;

		i {
			margin-top: 19px;
			margin-right: 10px;
		}
	}

	.created {
		margin: 0;
		color: #aaa;
		font-size: .7rem;
		text-align: center;
		margin-bottom: 5px;
	}
`;

