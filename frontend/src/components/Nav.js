import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DisplayUser from './DisplayUser.js';
import Auth from './Auth.js';

//globals

import { phoneP, phoneL, tabletP, tabletL } from '../globals/globals.js';

// components
import { Search } from './index.js';

/***************************************************************************************************
 *********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
	width: 100%;
	display: flex;
	color: black;
	justify-content: space-between;
`;

const DivAuth = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: flex-end;
	padding-right: 15px;

	@media ${tabletL} {
		width: ${({ user_id }) => (user_id !== 0 ? '50%' : '100%')};
		display: flex;
		justify-content: ${({ user_id }) => (user_id !== 0 ? 'flex-end' : 'center')};
		align-items: center;
	}

	@media (max-width: 800px) {
		justify-content: space-evenly;
	}
	@media ${phoneL} {
		display: flex;
		justify-content: ${({ user_id }) => (user_id !== 0 ? 'space-between' : 'center')};
		padding-right: 0px;
		width: ${({ user_id }) => (user_id !== 0 ? '40%' : '100%')};
	}

	i {
		color: ${(props) => props.theme.notificationFontColor};
		opacity: 0.5;
		margin-left: 10px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
`;

const SearchContainer = styled.div`
	margin-left: 15px;
	display: flex;
	width: 60%;
	justify-content: center;
	align-items: center;

	@media ${tabletP} {
		width: 40%;
		margin-left: 10px;
	}

	@media ${phoneL} {
		margin-left: 10px;
		width: 70%;
	}
`;

const StyledNavButton = styled.button`
	font-size: 28px;
	height: 48%;
	border: none;
	background: none;
	cursor: pointer;
	padding: 0;
	color: ${(props) => props.theme.notificationFontColor};
	opacity: 0.5;

	&:focus {
		outline: 0;
	}
	@media (min-width: 800px) {
		display: none;
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Nav extends Component {
	render() {
		return (
			<DivWrapper>
				{this.props.user_id !== 0 && (
					<SearchContainer>
						{this.props.isSideNavOpen === true ? (
							<StyledNavButton
								id="nav-button"
								className="fas fa-times"
								onClick={this.props.toggleSideNav}
							/>
						) : (
							<StyledNavButton
								id="nav-button"
								className="fas fa-bars"
								onClick={this.props.toggleSideNav}
							/>
						)}
						<Search
							showSearch={this.props.showSearch}
							scrollTo={this.props.scrollTo}
							pathname={this.props.pathname}
							goTo={this.props.goTo}
							toggleSearch={this.props.toggleSearch}
						/>
					</SearchContainer>
				)}
				<DivAuth user_id={this.props.user_id}>
					{/* {
            this.props.user_id !== 0 && (
              this.props.isDay ?
            <i onClick={this.props.switchTheme} className='fas fa-sun' /> :
            <i onClick={this.props.switchTheme} className='fas fa-moon' />
            )
          } */}

					{this.props.isLoggedIn ? (
						<DisplayUser
							history={this.props.history}
							isAvatarModalRaised={this.props.isAvatarModalRaised}
							setAvatarModalRaised={this.props.setAvatarModalRaised}
							isNotificationsModalRaised={this.props.isNotificationsModalRaised}
							setNotificationsModalRaised={this.props.setNotificationsModalRaised}
						/>
					) : (
						<Auth
							history={this.props.history}
							isLoginDropdownModalRaised={this.props.isLoginDropdownModalRaised}
							setLoginDropdownModalRaised={this.props.setLoginDropdownModalRaised}
							toggleRegisterModal={this.props.toggleRegisterModal}
						/>
					)}
					{/* {this.props.isSideNavOpen === true ? <StyledNavButton id='nav-button' className="fas fa-times" onClick={this.props.toggleSideNav}></StyledNavButton> : <StyledNavButton id='nav-button' className="fas fa-bars" onClick={this.props.toggleSideNav}></StyledNavButton>} */}
				</DivAuth>
			</DivWrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user_id: state.users.user_id,
		isLoggedIn: state.users.isLoggedIn
	};
};

export default connect(mapStateToProps, {})(Nav);
