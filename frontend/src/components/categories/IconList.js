import React from 'react';
import styled from 'styled-components';

// components
import { Icon } from '../index.js';

// globals
import { phoneL, topHeaderHeight } from '../../globals/globals.js';

const IconListWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	z-index: 10000;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);

	@media ${phoneL} {
		z-index: 10001;
		margin-top: ${topHeaderHeight};
	}
`;

const IconListBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: rgb(248,249,254);
	padding: 25px;
	border-radius: 5px;
	box-sizing: border-box;
	width: 590px;

	@media ${phoneL} {
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		padding: 0;
		border-radius: 0;
	}

	.above-input {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 15px;
	
		i{
			font-size: 30px;

			&:hover {
				cursor: pointer;
				color: steelblue;
			}
		}			
	}

	.icons {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
`;

const IconList = ({ selectedIcon, iconList, toggleIconList, setIcon }) => {
	return(
		<IconListWrapper>
			<IconListBox>
				<div className='above-input'>
					<span
					className='back'
					onClick={toggleIconList}		
					><i className="far fa-arrow-alt-circle-left"></i></span>
					<span></span>
				</div>
				<div className = 'icons'>
					{
						iconList.map((icon, i) =>
						<Icon
							key = { i }
							icon = { icon }
							selectedIcon = { selectedIcon }
							setIcon = { setIcon }
						/>)
					}
				</div>
				{/* <button className = 'cancel-btn' onClick = { toggleIconList }>Cancel</button> */}
			</IconListBox>
		</IconListWrapper>
	);
};

export default IconList;
