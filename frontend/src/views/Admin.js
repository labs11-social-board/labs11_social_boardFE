import React from 'react';

import styled from 'styled-components';
import Users from './Users';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import NoGo2 from '../components/NoGo2';
import { ApproveEmailForm, ApprovedEmails, DeletedPostAndMods } from '../components';

import '../components/css/Admin.css';

const MainWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 90%;
	font-size: 1.4rem;
	justify-content: space-around;
	justify-items: center;
	align-items: center;
	align-content: center;
	font-family: 'PT-Sans';

	.title {
		margin-top: 30px;
		margin-bottom: 5px;
	}
`;

const InnerWrapper = styled.div`
	width: 90%;
	font-size: 1.1rem;
	justify-content: space-around;
	justify-items: center;
	align-items: center;
	align-content: center;
`;

const Boxed = styled.div`
	width: 100%;
	padding: 10px;
	border: 1px solid #f66042;
	border-radius: 5px;
	flex-direction: column;
	justify-content: space-around;
	margin-bottom: 10px;
`;

const TableWrapper = styled.div`width: 90%;`;

const ButtonY = styled.button`
	border: 1px solid #f66042;
	border-radius: 3px;
	color: white;
	background-color: #f66042;
	height: 35px;
	width: 100px;
	margin-left: 4px;
`;

const StyledA = styled.a`
	color: white;
	text-decoration: none;

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;

const StyledLink = styled(NavLink)`
    color: white;  
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

class Admin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		  
		  updated: this.props.verified,
		  
		}
	  }

	// componentDidMount() {

	// }

	render() {
		//if (!this.props.isLoggedIn) return <h2>--Yo, dog.  You ain't logged in.  Do That <Link to="/">HERE</Link> </h2>;

		if (!this.props.verified) {
			return (
			  <NoGo2 />
			)
		  }

		return (
			<TableWrapper>
				<div>
					<MainWrapper>
						<div>
							<h2>Admin Console</h2>
						</div>

						<InnerWrapper>
							{/* <Boxed>
                                <ApproveEmailForm histoy={this.props.history} isDay={this.props.isDay} />
                                <br></br>
                                <ApprovedEmails isDay={this.props.isDay} />
                            </Boxed> */}
							<Boxed>
								<ApproveEmailForm histoy={this.props.history} isDay={this.props.isDay} />
								<br />
								<h4>Users</h4>

								<Users isDay={this.props.isDay} />
								<br />
								<br />
								<ButtonY>
									<StyledLink to="/approved">E-Mail List View</StyledLink>
								</ButtonY>
							</Boxed>
							<Boxed>
								<h4>Deleted Post</h4>
								<DeletedPostAndMods isDay={this.props.isDay} />
							</Boxed>
							<Boxed>
								<h2>Demo Site</h2>
								<p>Make use of all Admin (and moderator) site functionality on a demo site!</p>
								<p>Login with- Username: admin Password: admin </p>
								<ButtonY>
									<StyledA href="https://sympdemo.netlify.com/" target="_blank">
										DEMO SITE
									</StyledA>
								</ButtonY>
							</Boxed>
						</InnerWrapper>
					</MainWrapper>
				</div>
			</TableWrapper>
		);
	}
}

const mapStateToProps = state => ({
	verified: state.users.verified,
  });

export default connect(
	mapStateToProps,
  {}
)(Admin);
