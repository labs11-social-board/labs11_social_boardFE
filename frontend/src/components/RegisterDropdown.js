import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { register, isEmailTaken, isUsernameTaken } from '../store/actions/index.js';

// components
import { ToolTip } from './index.js';

//globals
import { phoneL } from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/

const DivWrapper = styled.div`
	display: ${props => props.showRegisterModal === 'true' ? 'flex' : 'none'};

	.tooltip {
    z-index: 9000;
    position: relative;

    &:hover {
      .tooltiptext {
        margin-top: 20px;
        visibility: visible;
        opacity: 1;
        color: white;
      }
    }
  }
`;

const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  position: fixed;
  right: 0;
  width: 270px;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.isDay ? 'white' : '#555' };
  border-radius: 5px;
	padding: 20px;
	
	.wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

  input {
    height: 22px;
    margin-bottom: 5px;
    border-radius: 5px;
    width: 80%;
    background-color: ${props => props.theme.borderColor};
    color: black;
    padding: 5px;

    &:focus {
      outline: none;
    }
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;

    .btn {
      padding: 10px 15px;
      border-radius: 5px;
      border: none;
      background-color: #418DCF;
      color: white;
      border: 1px solid #418DCF;
      width: 85%;
      margin: 5px 0;

      &:hover {
        cursor: pointer;
        background-color: white;
        color: #418DCF;
        border: 1px solid #418DCF;
      }
    }
  }
`;

const DivModalCloser = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9997;

  @media ${phoneL} {
    display: none;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class RegisterDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: '',
		};
	};

	handleInputChange = ev => {
    const chars = ev.target.value;
    if (ev.target.name === 'email') {
      this.setState(
        {
          email: chars
        },
        () => this.props.isEmailTaken(this.state.email)
      );
    } else if (ev.target.name === 'username') {
      this.setState(
        {
          username: chars
        },
        () => this.props.isUsernameTaken(this.state.username)
      );
    } else {
      this.setState({
        [ev.target.name]: ev.target.value
      });
    }
  };

	setIsReady = (ev, status) => {
    ev && ev.preventDefault();
    if (status) {
      this.props.isUsernameTaken(this.state.username).then(() => {
        if (this.props.usernameTaken) {
          return this.props.displayError('username taken');
        }

        if (this.state.email) {
          this.props.isEmailTaken(this.state.email).then(() => {
            if (this.props.emailTaken) {
              return this.props.displayError('email taken');
            }

            if (status && this.state.username && this.state.password) {
              this.setState(
                { isReady: status },
                () => !status && this.props.history.push('/home')
              );
            } else if (!status) {
              this.setState(
                { isReady: status },
                () => !status && this.props.history.push('/home')
              );
            } else {
              this.props.displayError('missing field');
            }
          });
        } else {
          if (status && this.state.username && this.state.password) {
            this.setState(
              { isReady: status },
              () => !status && this.props.history.push('/home')
            );
          } else if (!status) {
            this.setState(
              { isReady: status },
              () => !status && this.props.history.push('/home')
            );
          } else {
            this.props.displayError('missing field');
          }
        }
      });
    } else {
      this.props.history.push('/home');
    }
  };
	
	handleSubmit = e => {
		e.preventDefault();
		const newAccount = {
			username: this.state.username,
			password: this.state.password,
			email: this.state.email,
		};
		this.props.register(newAccount).then(() => this.setIsReady(null, false));
	};

  render() {
    return (
			<DivWrapper showRegisterModal={this.props.showRegisterModal.toString()}>
			<DivModalCloser onClick={(ev) => this.props.toggleRegisterModal(ev)} />
			<FormLogin isDay = { this.props.isDay } onSubmit = { this.handleSubmit }>
				<div className = 'wrapper'>
					<input
						onChange={this.handleInputChange}
						placeholder='Name'
						value={this.state.username}
						name='username'
						autoComplete='off'
					/>
					{this.state.username !== '' &&
						this.props.userExistsLoadingMessage && (
							<img
								src={require('../assets/gif/spinner2.gif')}
								alt='spinner'
							/>
						)}
						{
						this.state.username === "" ?
							<span className='tooltip'>
								<img src={require('../assets/img/redX.png')} alt='X' />
								<ToolTip
									text='Invalid username.' // must  be any string
									arrow='left' // must be string that says 'top', 'right', 'left', or 'bottom'
									width={200} // must be a number
								/>
							</span> :
							(!this.props.userExistsLoadingMessage &&
								this.props.usernameTaken) && (
								<span className='tooltip'>
									<img src={require('../assets/img/redX.png')} alt='X' />
									<ToolTip
										text='Username already taken.' // must  be any string
										arrow='right' // must be string that says 'top', 'right', 'left', or 'bottom'
										width={200} // must be a number
									/>
								</span>
							)
					}
					{this.state.username !== '' &&
						!this.props.userExistsLoadingMessage &&
						!this.props.usernameTaken && (
							<img
								src={require('../assets/img/greenCheckmark.png')}
								alt='checkMark'
							/>
						)}
				</div>

				<div className = 'wrapper'>
					<input
						type='password'
						onChange={this.handleInputChange}
						placeholder='Password'
						value={this.state.password}
						name='password'
						autoComplete='off'
					/>
				</div>

				<div className = 'wrapper'>
				<input
					type='email'
					onChange={this.handleInputChange}
					placeholder='Optional email'
					value={this.state.email}
					name='email'
					autoComplete='on'
				/>
				{this.state.email !== '' &&
							this.props.emailExistsLoadingMessage && (
								<img
									src={require('../assets/gif/spinner2.gif')}
									alt='spinner'
								/>
							)}
						{this.state.email !== '' &&
							!this.props.emailExistsLoadingMessage &&
							this.props.emailTaken && (
								<span className='tooltip'>
									<img src={require('../assets/img/redX.png')} alt='X' />
									<ToolTip
										text='Email is already taken.' // must  be any string
										arrow='right' // must be string that says 'top', 'right', 'left', or 'bottom'
										width={200} // must be a number
									/>
								</span>
							)}
						{this.state.email !== '' &&
							!this.props.emailExistsLoadingMessage &&
							!this.props.emailTaken && (
								<img
									src={require('../assets/img/greenCheckmark.png')}
									alt='checkMark'
								/>
							)}
				</div>

				<div className = 'buttons'>
					<button
						type='submit'
						className = 'btn'
					>
						Register
					</button>
				</div>
			</FormLogin>
		</DivWrapper>
    );
  }
};

const mapStateToProps = state => {
  return {
		isDay: state.users.isDay,
		userExistsLoadingMessage: state.users.userExistsLoadingMessage,
    emailExistsLoadingMessage: state.users.emailExistsLoadingMessage,
    usernameTaken: state.users.isUsernameTaken,
    emailTaken: state.users.isEmailTaken,
  };
};

export default connect(
  mapStateToProps,
  { register, isEmailTaken, isUsernameTaken }
)(RegisterDropdown);