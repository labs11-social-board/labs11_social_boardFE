import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { getUsers } from '../store/actions/index.js';

// globals
import { phoneL, topHeaderHeight } from '../globals/globals.js';

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 8001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  user-select: none;
`;

const DivModalCloser = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 8002;
`;

const DivModal = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  z-index: 8003;
  background: rgb(248,249,254);
  padding: 25px;
  border-radius: 5px;
  box-sizing: border-box;
  width: 590px;

  .btn {
    margin-left: 10px;
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #418DCF;
    background-color: #418DCF;
    color: white;

    &:hover {
      cursor: pointer;
      background-color: white;
      color: #418DCF;
      border: 1px solid #418DCF;
    }

    @media (max-width: 600px) {
      width: 60vw;
      margin-top: 10px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

  .above-input {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 15px;

    i{
      font-size: 30px;

      &:hover {
          cursor: pointer;
          color: steelblue;
        }
    }			
  }
`;

class UsersListModal extends React.Component {
  componentDidMount(){
    this.props.getUsers();
  }
  render(){
    const { setTeamMemberModal, users } = this.props;
    if(!users){
      return <div>...Loading</div>;
    } else {
      return (
        <ModalBackground>
          <DivModalCloser onClick={(e) => setTeamMemberModal(e, false)} />
          <DivModal>
            <div className='above-input'>
              <span
                className='back'
                onClick={(e) => setTeamMemberModal(e, false)}		
              ><i className="far fa-arrow-alt-circle-left"></i></span>
              <span></span>
            </div>
            <div className='users-list-wrapper'>
              {users.map(user => {
                return <h2>{user.username}</h2>
              })}
            </div>
          </DivModal>
        </ModalBackground>
      );
    }
  };
};

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(mapStateToProps, { getUsers })(UsersListModal);