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

;(function(w, d, s, g, js, fjs) {
    g = w.gapi || (w.gapi = {})
    g.analytics = {
      q: [],
      ready: function(cb) {
        this.q.push(cb)
      }
    }
    js = d.createElement(s)
    fjs = d.getElementsByTagName(s)[0]
    js.src = "https://apis.google.com/js/platform.js"
    fjs.parentNode.insertBefore(js, fjs)
    js.onload = function() {
      g.load("analytics")
    }
  })(window, document, "script")

  const authClient = process.env.CLIENTG;
  
  const CLIENT_ID = '338748654790-mrdntpnj4ddjetcjqgss9b64f4j1vn1s.apps.googleusercontent.com';

  const last30days = {
    reportType: "ga",
    query: {
      dimensions: "ga:date",
      metrics: "ga:pageviews",
      "start-date": "30daysAgo",
      "end-date": "yesterday"
    },
    chart: {
      type: "LINE",
      options: {
        // options for google charts
        // https://google-developers.appspot.com/chart/interactive/docs/gallery
        title: "Last 30 days pageviews"
      }
    }
  }

  const views = {
    query: {
      ids: "ga:193170741"
    }
  }


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
                            <GoogleProvider clientId={CLIENT_ID}>
                                <GoogleDataChart views={views} config={last30days} />
                               
                            </GoogleProvider>
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