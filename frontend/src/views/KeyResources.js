import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import Users from './Users';

import '../components/css/Admin.css'
import KeyResourceForm from '../components/forms/KeyResourceForm';
import ApprovedKeyResources from '../components/ApprovedKeyResources';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 1.4rem;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  align-content: center;

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
border: 2px solid #418dcf;
border-radius: 5px;
flex-direction: column;
justify-content: space-around;
margin-bottom: 10px;
`;

const TableWrapper = styled.div`
width: 90%;
`;




class KeyResources extends React.Component {
    constructor() {
        super()

    }

    // componentDidMount() {

    // }

    render() {
        
        return (
            <TableWrapper>

                <div>
                    <MainWrapper>
                        <div>
                            <h2>Key Resources Admin/Changes</h2>
                        </div>

                        <InnerWrapper>
                            <Boxed>
                                <KeyResourceForm histoy={this.props.history} />
                            </Boxed>
                            <Boxed>
                                <ApprovedKeyResources />
                            </Boxed>
                                                        
                        </InnerWrapper>
                    </MainWrapper>
                </div>
            </TableWrapper>
        )
    }
}

const mapStoreToProps = state => {
    console.log('Admin State', state)
    return {

    };
};

export default KeyResources;