import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import Users from './Users';
import { getPageViews, getUsersAna, } from './../store/actions/analyticActions';

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


class Analytics extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pagev1: null
        }
    }

    componentDidMount() {
        this.props.getPageViews();
        
        this.setState({
            pagev1: [this.props.gPageviews.data]
        })

        //getUsersAna();
    }

    render() {

        return(
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
                                <h2>0</h2>
                                {console.log(this.props.gPageviews.data)}
                                {console.log(this.state)}
                                
                            </Boxed>
                            
                            <Boxed>
                                <h4>Users</h4>
                                <p>In last 30 Days</p>
                            
                            </Boxed>
                            
                            
                        </InnerWrapper>
                    </MainWrapper>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        gPageviews: state.analytics.gPageviews,
        gUsers: state.analytics.gUsers,
        gettingGPdata: state.analytics.gettingGPdata,
        gettingGUdata: state.analytics.gettingGUdata
    };
  };

  
  export default connect(
    mapStateToProps,{ getPageViews, getUsersAna, } 
  )(Analytics);