import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import Users from './Users';
import { getPageViews, getUsersAna, getPageViews30, getUsersAna30, } from './../store/actions/analyticActions';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget';

import {} from '../components'

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
border: 2px solid black;
border-radius: 5px;
flex-direction: column;
justify-content: space-around;
margin-bottom: 10px;

`;

const TableWrapper = styled.div`
width: 90%;
`;



class Analytics extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pagev1: null,
            pagev2: null,
            pagev3: null,
            pagev4: null,
        }
    }

    async componentDidMount() {
        //await this.props.getPageViews();
        //await this.props.getUsersAna();
        await this.props.getPageViews30();
        await this.props.getUsersAna30();
        
                
        this.setState({
            pagev1: this.props.gPageviews30.data.totalsForAllResults['ga:pageviews'],
            pagev2: this.props.gUsers30.data.totalsForAllResults['ga:users'],
        })

        //getUsersAna();
    }


    render() {

        return(
            <TableWrapper>
            <div>
                
                <div >
                    <MainWrapper>   
                        <div>
                            <h2>Analytics View</h2>
                        </div>

                        <InnerWrapper>
                            <Boxed>
                                <h4>Pageviews</h4>
                                <p>In last 30 Days</p>
                                <h2>{this.state.pagev1}</h2>
                                
                            </Boxed>
                            
                            <Boxed>
                                <h4>Users</h4>
                                <p>In last 30 Days</p>
                                <h2>{this.state.pagev2}</h2>
                            
                            </Boxed>

                            <Boxed>
                            
                            </Boxed>
                            
                            
                        </InnerWrapper>
                    </MainWrapper>
                </div>
            </div>
            </TableWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        gPageviews: state.analytics.gPageviews,
        gUsers: state.analytics.gUsers,
        gettingGPdata: state.analytics.gettingGPdata,
        gettingGUdata: state.analytics.gettingGUdata,
        gPageviews30: state.analytics.gPageviews30,
        gUsers30: state.analytics.gUsers30,
        gettingGPdata30: state.analytics.gettingGPdata30,
        gettingGUdata30: state.analytics.gettingGUdata30,
    };
  };

  
  export default connect(
    mapStateToProps,{ getPageViews, getUsersAna, getPageViews30, getUsersAna30, } 
  )(Analytics);