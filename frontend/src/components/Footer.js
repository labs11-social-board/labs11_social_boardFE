import React from 'react';
import styled from 'styled-components';

//globals
import { phoneL, tabletP } from '../globals/globals.js'

/***************************************************************************************************
 *********************************************** Styles *********************************************
 **************************************************************************************************/

const DivWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  background-color: ${props => props.theme.footerColor};
  color: white;
  margin: 0;
  align-items: center;
  justify-content: center;
  z-index: 9901;
  @media ${tabletP}{
    width: 100%;
    
    @media ${phoneL}{
      width: 100%;
    }
  }
`;

const FooterContents = styled.div`
    font-size: 14px;
    display: inline;
    margin: 0 auto;

    i {
        font-size: 11px;
    }
`

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Footer = ({ toggleSearch, switchTheme }) => {
  return (
    <DivWrapper>
      <FooterContents>
        <p>Symposium Forums <i className="far fa-copyright"></i> 2018</p>
      </FooterContents>
    </DivWrapper>
  );

}

export default Footer;