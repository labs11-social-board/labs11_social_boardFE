import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';
import NoGo2 from '../components/NoGo2';
import styled from 'styled-components';

import {
    approveEmail,
    getEmails,
    denyEmail
} from '../store/actions';

import ReactTable from "react-table";
import "react-table/react-table.css";

const DenyButton = styled.button`
    border: 1px solid red;
    border-radius: 3px;
    background-color: red;
    color: white;
    font-weight: bold;
    height: 35px;
    width: 100px;
    margin-left: 4px;
    cursor: pointer;

`
const SubDrawer = styled.div`
  padding: 20px;
`

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
border: 1px solid #418dcf;
border-radius: 5px;
flex-direction: column;
color:black;
justify-content: space-around;
margin-bottom: 10px;
`;

const TableWrapper = styled.div`
width: 90%;
`;




class ApprovedEmails extends Component {
    constructor(props) {
		super(props)
		this.state = {
		  
		  updated: this.props.verified,
		  
		}
	  }



    componentDidMount() {
        this.props.getEmails();
        this.addFilterPlaceholder();
    }

    handleClick(e, id) {
        e.preventDefault();

        this.props.denyEmail(id)
        setTimeout(() => {
            window.location.reload();
        }, 400);
    }

    addFilterPlaceholder = () => {
        const filters = document.querySelectorAll("div.rt-th > input");
        for (let filter of filters) {
            filter.placeholder = "Search...";
        }
    }

    render() {

        if (!this.props.verified) {
			return (
			  <NoGo2 />
			)
		  }

        return (
            <TableWrapper>
                <MainWrapper>
                <InnerWrapper>
                <Boxed>
                    <h4>Approved E-Mails Table View</h4>
                <ReactTable
                    data={this.props.approvedEmails}
                    filterable
                    defaultFilterMethod={
                        (filter, row) =>
                            String(row[filter.id]) === filter.includes(filter.value)
                    }
                    columns={
                        [
                            {
                                Header: "Approved E-Mails",
                                accessor: "email",
                                filterMethod: (filter, row) =>
                                    row[filter.id].startsWith(filter.value) &&
                                    row[filter.id].endsWith(filter.value)
                            }
                        ]
                    }
                    SubComponent={
                        row => {
                            console.log(row)
                            return (
                                <SubDrawer>
                                    <DenyButton
                                        onClick={e => this.handleClick(e, row.original.id)}
                                    > Deny Email </DenyButton>
                                </SubDrawer>
                            );
                        }
                    }
                    defaultPageSize={
                        5
                    }
                    className="-striped -highlight"
                    style={
                        this.props.isDay ?
                            {
                                color: 'black'
                            }
                            : {
                                color: 'black'
                            }
                    }
                />
                </Boxed>
                </InnerWrapper>
                </MainWrapper>
            </TableWrapper>
        )
    }
}

const mapStoreToProps = state => {
    return {
        approvedEmails: state.emails.approvedEmails,
        verified: state.users.verified,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        approveEmail: email => dispatch(approveEmail(email)),
        getEmails: () => dispatch(getEmails()),
        denyEmail: id => dispatch(denyEmail(id))
    }
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ApprovedEmails);