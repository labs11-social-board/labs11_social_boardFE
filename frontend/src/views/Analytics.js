import React from 'react';
import {Bar} from 'react-chartjs-2';


import styled from 'styled-components';
import { connect } from "react-redux";

import { getPageViews, getUsersAna, getPageViews30, getUsersAna30, } from './../store/actions/analyticActions';


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
            isLoaded: false,
            dataA: [],
            dataB: [],
            dataC: [],
            
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
            pagev3: this.props.gPageviews30.data.rows,
            pagev4: this.props.gUsers30.data.rows
        })

        //console.log(this.state.pagev3)

        //await tom();

        for( let i =0; i < this.state.pagev3.length; i++) {
            let part1 = this.state.pagev3[i][0];
            let part2 = Number(this.state.pagev3[i][1]);
            
            this.state.dataA.push(part1);
            //console.log(this.state.dataA)
            this.state.dataB.push(part2);  
        }

        for( let i =0; i < this.state.pagev4.length; i++) {
            //let part1 = this.state.pagev4[i][0];
            let part2 = Number(this.state.pagev4[i][1]);
            
            //this.state.dataA.push(part1);
            //console.log(this.state.dataA)
            this.state.dataC.push(part2);  
        }

        this.setState ({
            isLoaded: true,
        })

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
                            <div style={{position: "relative", width:800, height: 800}}>
                                <Bar
                                    options={{
                                        responsive:true
                                    }}
                                    data={{
                                            labels: ['30','29','28','27','26','25','24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1','0'],
                                            datasets: [
                                                {
                                                    label: "Page Views Per Day",
                                                    backgroundColor: "#418dcf",
                                                    data: [
                                                        this.state.dataB[0],
                                                        this.state.dataB[1],
                                                        this.state.dataB[2],
                                                        this.state.dataB[3],
                                                        this.state.dataB[4],
                                                        this.state.dataB[5],
                                                        this.state.dataB[6],
                                                        this.state.dataB[7],
                                                        this.state.dataB[8],
                                                        this.state.dataB[9],
                                                        this.state.dataB[10],
                                                        this.state.dataB[11],
                                                        this.state.dataB[12],
                                                        this.state.dataB[13],
                                                        this.state.dataB[14],
                                                        this.state.dataB[15],
                                                        this.state.dataB[16],
                                                        this.state.dataB[17],
                                                        this.state.dataB[18],
                                                        this.state.dataB[19],
                                                        this.state.dataB[20],
                                                        this.state.dataB[21],
                                                        this.state.dataB[22],
                                                        this.state.dataB[23],
                                                        this.state.dataB[24],
                                                        this.state.dataB[25],
                                                        this.state.dataB[26],
                                                        this.state.dataB[27],
                                                        this.state.dataB[28],
                                                        this.state.dataB[29],
                                                        this.state.dataB[30],
                                                    ]
                                                
                                                },
                                                {
                                                    label: "Users Per Day",
                                                    backgroundColor: "#f173b8",
                                                    data: [
                                                        this.state.dataC[0],
                                                        this.state.dataC[1],
                                                        this.state.dataC[2],
                                                        this.state.dataC[3],
                                                        this.state.dataC[4],
                                                        this.state.dataC[5],
                                                        this.state.dataC[6],
                                                        this.state.dataC[7],
                                                        this.state.dataC[8],
                                                        this.state.dataC[9],
                                                        this.state.dataC[10],
                                                        this.state.dataC[11],
                                                        this.state.dataC[12],
                                                        this.state.dataC[13],
                                                        this.state.dataC[14],
                                                        this.state.dataC[15],
                                                        this.state.dataC[16],
                                                        this.state.dataC[17],
                                                        this.state.dataC[18],
                                                        this.state.dataC[19],
                                                        this.state.dataC[20],
                                                        this.state.dataC[21],
                                                        this.state.dataC[22],
                                                        this.state.dataC[23],
                                                        this.state.dataC[24],
                                                        this.state.dataC[25],
                                                        this.state.dataC[26],
                                                        this.state.dataC[27],
                                                        this.state.dataC[28],
                                                        this.state.dataC[29],
                                                        this.state.dataC[30],
                                                    ]
                                                }
                                            ]
                                    }}
                                />
                            </div>
                            </Boxed>
                            
                            {/* {console.log(this.state.dataA)}
                            {console.log(this.state.dataB)} */}
                            
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





// {/* <div style={{position: "relative", width:800, height: 700}}>
//     <Bar
//         options={{
//             responsive:true
//         }}
//         data={{
//                 labels: ['30','29','28','27','26','25','24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1','0'],
//                 datasets: [
//                     {
//                         label: "Page Views",
//                         backgroundColor: "#863546",
//                         data: this.state.dataB
//                     },
//                     {
//                         label: "Dummy Data",
//                         backgroundColor: "#473146",
//                         data: [1,18,12,24,2,19,6,13]
//                     }
//                 ]
//         }}
//     />
// </div> */}