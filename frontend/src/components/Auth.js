import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// globals
import { phoneP, phoneL } from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const LogInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${props => props.theme.authColor};
  font-size: 18px;
  width: 40%;

  @media ${phoneL}{
      width: 80%;
    }
    @media ${phoneP}{
      width: 80%;
      }
`;

const DivAuthRegLog = styled.div`
  width: 90%;
  margin-top: -5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div {
    color: black;
  }

  @media (max-width: 750px){

  }
  @media ${phoneL}{
      width: 80%;
      display: flex;
      flex-direction: column;
      .line {
        display: none;
      }
    }
    @media ${phoneP}{
      width: 80%;
      display: flex;
      flex-direction: column;
      .line {
        display: none;
      }
    }

`;

const DivLogin = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
`;

const Login = styled.a`
  margin-left: 5px;
  user-select: none;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.defaultColorOnHover};
  }

  img {
    transform: ${props => props.isLoginDropdownModalRaised && 'rotate(180deg)'};
  }

  #register {
    color: ${props => props.theme.defaultColor};
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Auth = (props) => {
  return (
    <LogInContainer>
      <DivAuthRegLog>
        <Login onClick={ev => props.toggleRegisterModal(ev)}
          >
            <span id = 'register'>Register</span>
          </Login>
        <div className="line">&nbsp;|&nbsp;</div>
        <DivLogin>
          <Login onClick={ev => props.setLoginDropdownModalRaised(ev, !props.isLoginDropdownModalRaised)}
            isLoginDropdownModalRaised={props.isLoginDropdownModalRaised}
          >
            <span id = 'register'>Login</span>
          </Login>
        </DivLogin>
      </DivAuthRegLog>
    </LogInContainer>
  );
};

export default connect(null, {})(Auth);
