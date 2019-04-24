import React from 'react';

import styled from 'styled-components';
import { connect } from 'react-redux';
import NoGo2 from '../components/NoGo2';
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
border: 1px solid #f66042;
border-radius: 5px;
flex-direction: column;
justify-content: space-around;
margin-bottom: 10px;
`;

const TableWrapper = styled.div`
width: 90%;
`;




class KeyResources extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
		  
		  updated: this.props.verified,
		  
		}
	  }

    // componentDidMount() {

    // }

    render() {

        if (!this.props.verified) {
			return (
			  <NoGo2 />
			)
		  }
        
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

const mapStateToProps = state => ({
	verified: state.users.verified,
  });

export default connect(
	mapStateToProps,
  {}
)(KeyResources);

