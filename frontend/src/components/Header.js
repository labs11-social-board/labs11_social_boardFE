import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Nav } from '../components/index.js';

// assets
import { symposiumDark, symposiumLight, symposiumLightOrange, symposiumDarkOrange } from '../assets/index.js';

// Globals
import { sideNavWidth, topHeaderHeight, phoneP, phoneL, tabletP, tabletL } from '../globals/globals.js';

const StyledHeader = styled.div`
	position: sticky;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	height: ${topHeaderHeight};
	width: 100%;
	z-index: 9000;
	align-self: center;
	background-color: ${(props) => props.theme.headerBg};
	border-bottom: 2px solid ${(props) => props.theme.bgColor};

	@media ${tabletL} {
		width: 100%;
	}
	@media ${tabletP} {
		width: 100%;
	}
	@media ${phoneL} {
		width: 100%;
	}
	@media ${phoneP} {
		41: 100%;
	}

	.LogoContainer {
		width: ${sideNavWidth};
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		background-color: ${(props) => props.theme.bgColor};

		border-right: 2px solid ${(props) => props.theme.borderColor};
		&:hover {
			cursor: pointer;
		}

		@media ${phoneL} {
			width: 42%;
		}
	}
`;

const NavContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: ${(props) => props.theme.headerBg};

	@media ${tabletL} {
		width: 100%;
	}
	@media ${phoneL} {
		width: 100%;
		justify-content: space-between;
	}
`;

const SympLogo = styled.div`
	width: ${sideNavWidth};
	height: 50px;
	background-repeat: no-repeat;
	background-position: center;
	background-image: url(${({ isDay }) => (isDay ? symposiumLightOrange : symposiumDarkOrange)});
	&:hover {
		cursor: pointer;
	}
`;

const Header = ({
	showSearch,
	scrollTo,
	pathname,
	goTo,
	isDay,
	history,
	isAuthenticated,
	toggleSearch,
	switched,
	isLoginDropdownModalRaised,
	setLoginDropdownModalRaised,
	isAvatarModalRaised,
	setAvatarModalRaised,
	isNotificationsModalRaised,
	setNotificationsModalRaised,
	toggleRegisterModal,
	isSideNavOpen,
	toggleSideNav
}) => {
	return (
		<StyledHeader>
			<Link className="LogoContainer" to="/home">
				<SympLogo isDay={isDay} />
			</Link>
			<NavContainer>
				<Nav
					showSearch={showSearch}
					scrollTo={scrollTo}
					pathname={pathname}
					goTo={goTo}
					isDay={isDay}
					history={history}
					isAuthenticated={isAuthenticated}
					toggleSearch={toggleSearch}
					switchTheme={switched}
					isLoginDropdownModalRaised={isLoginDropdownModalRaised}
					setLoginDropdownModalRaised={setLoginDropdownModalRaised}
					isAvatarModalRaised={isAvatarModalRaised}
					setAvatarModalRaised={setAvatarModalRaised}
					isNotificationsModalRaised={isNotificationsModalRaised}
					setNotificationsModalRaised={setNotificationsModalRaised}
					toggleRegisterModal={toggleRegisterModal}
					isSideNavOpen={isSideNavOpen}
					toggleSideNav={toggleSideNav}
				/>
			</NavContainer>
		</StyledHeader>
	);
};

export default Header;
