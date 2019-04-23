import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import styled from 'styled-components';

// action creators
import { addTeamMember } from '../store/actions/index.js';

// assets
import { spinner2 } from "../assets/index.js";

// components 
import { User } from './index.js';

// globals
import { backendUrl } from "../globals/globals.js";

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
z-index: 8003;
background: rgb(248,249,254);
padding: 25px;
border-radius: 5px;
box-sizing: border-box;
width: 590px;
height: 50%;
overflow: auto;

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

  .search-input-wrapper {
    position: relative;
    border: none;
    width: 100%;

    .fa-search {
      color: #acb1bc;
      position: absolute;
      top: 7px;
      left: 10px;
    }

    .search-input {
      width: 80%;
      border: none;
      border-radius: 55px;
      padding: 5px 10px;
      font-size: 14px;
      text-indent: 27px;
      ::placeholder {
        color: #babec8;
      }
    }
  }

`;

class UsersListModal extends React.Component {
  state = {
    searchText: '',
    loading: false,
    searchResults: []
  };
  inviteUser = (e, user_id)=> {
    e.preventDefault();
    const { team_id } = this.props;

    this.props.addTeamMember(user_id, team_id);
    this.props.setTeamMemberModal(e, false)
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.searchUsers();
    })
  };
  searchUsers = () => {
    const { displayError } = this.props;
    const { searchText } = this.state;
    const headers = { headers: { searchText } };

    this.setState({ loading: true }, () => {
      return axios
        .get(`${backendUrl}/users/search-user`, headers)
        .then(res => this.setState({ searchResults: res.data }))
        .then(() => this.setState({ loading: false }))
        .catch(err => {
          const errMsg = err.response
            ? err.response.data.error
            : err.toString();
          return displayError(errMsg).then(() =>
            this.setState({ loading: false })
          );
        });
    })
  }
  render(){
    const { setTeamMemberModal } = this.props;
      return (
        <ModalBackground>
          <DivModalCloser onClick={(e) => setTeamMemberModal(e, false)} />
          <DivModal>
            <div className='above-input'>
              <span
                className='back'
                onClick={(e) => setTeamMemberModal(e, false)}		
              ><i className="fa fa-arrow-left"></i></span>
              <span></span>
            </div>
            <div className='search-input-wrapper'>
              <span className="fa fa-search" />
              <input 
                type='text'
                name='searchText' 
                className='search-input' 
                value={this.state.searchText} 
                onChange={this.handleInputChange} 
                placeholder='Search for a User'
                autoComplete='off'
              />
            </div>
            <div className='users-list-wrapper'>
              {this.state.loading ? <img src={spinner2} alt="spinner" /> 
                : this.state.searchResults.map(user => <User user={user} key={user.id} inviteUser={this.inviteUser} /> )}
            </div>
            
          </DivModal>
        </ModalBackground>
      );
  };
};

const mapStateToProps = state => ({ });

export default connect(mapStateToProps, { addTeamMember })(UsersListModal);