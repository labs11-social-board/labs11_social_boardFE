import React from 'react';

import {NavLink} from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
// import Users from './Users';
import CSVReader from "react-csv-reader";
import { emailCSV } from './../store/actions/UsersActions';
// import { approveEmail } from './../store/actions/EmailActions';

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

const ButtonY = styled.button `
    border: 1px solid #f66042;
    border-radius: 3px;
    color: white;
    background-color: #f66042;
    height: 35px;
    width: 200px;
    margin-left: 4px;
  `;

//   const ButtonX = styled.button `
//     border: 1px solid #418DCF;
//     border-radius: 3px;
//     color: white;
//     background-color: #418DCF;
//     height: 35px;
//     width: 100px;
//     margin-left: 24px;
    
//   `;
  
  const StyledLink = styled(NavLink)`
    color: white;  
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;




  
  
class Upload extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            newEmail: {
                first_name:"",
                last_name:"",
                email:""
            },
            done: this.props.uploadDone,
        }

    }


    handleUppy = data => {
        
        for( let i =0; i < data.length; i++) {
            let fname = data[i][0];
            let lname = data[i][1];
            let mail = data[i][2];

            this.setState({
                ...this.state,
                newEmail: {
                    first_name: fname,
                    last_name: lname,
                    email: mail
                }
            })

            this.props.emailCSV(this.state.newEmail)
            
            console.log(this.state.newEmails);

            
        }

        this.setState({
            ...this.state,
            done: this.props.uploadDone,
        })
    }

    // componentDidMount() {
        
    // }

    render() {

        //if (!this.props.isLoggedIn) return <h2>--Yo, dog.  You ain't logged in.  Do That <Link to="/">HERE</Link> </h2>;

        return(
            <div>
                
                <div >
                    <MainWrapper>   
                        <div>
                            <h2>Admin Console</h2>
                        </div>

                        <InnerWrapper>
                        <Boxed>
                            <h4>Add Email List via CSV upload</h4>
                            <p>[ CSV FORMAT: firstname, lastname, email ]</p>
                            
                            <div className="container">
                            <CSVReader
                                cssClass="ButtonY"
                                label="Upload a CSV file full of Authorized E-Mails!"
                                onFileLoaded={this.handleUppy}
                            />
                            <p>Upload Status (Upload Starts Automatically After File Selected):</p>
                            {(this.props.uploadDone === true) ?
                            (<h4>Done</h4>) : <h4>Not Started</h4>}
                            {console.log(this.props.uploadDone)}
                            <hr></hr>
                            <ButtonY>
                            <StyledLink to='/admin'>
                                    Back to User Management
                                </StyledLink>
                            </ButtonY>
                            
                            </div>
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
        uploadDone: state.users.uploadDone
        
    };
  };
  
  export default connect(
    mapStateToProps,{ emailCSV } 
  )(Upload);

  