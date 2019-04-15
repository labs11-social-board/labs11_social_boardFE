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

    }

    componentDidMount() {
        this.props.getPageViews(); 
        //getUsersAna();
    }

    render() {

        //if (!this.props.isLoggedIn) return <h2>--Yo, dog.  You ain't logged in.  Do That <Link to="/">HERE</Link> </h2>;

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
                                <h2>{this.props.gPageviews}</h2>
                                {console.log(this.props.gPageviews)}
                                
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
        gPageviews: state.gPageviews,
        gUsers: state.gUsers,
        gettingGPdata: state.gettingGPdata,
        gettingGUdata: state.gettingGUdata
    };
  };

  
  export default connect(
    mapStateToProps,{ getPageViews, getUsersAna, } 
  )(Analytics);