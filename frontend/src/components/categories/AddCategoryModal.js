import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addCategory, displayError } from '../../store/actions/index.js';

// components
import { IconList } from '../index.js';

// globals
import { phoneL, topHeaderHeight, backendUrl } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
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

const DivModalCloser = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 8002;
`;

const FormContent = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;

  @media ${phoneL} {
    height: 90%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: ${topHeaderHeight};
  }
`;

const DivLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 34%;
  align-items: center;
`;

const ImgPreview = styled.i`
  max-width: 50px;
  max-height: 50px;
  font-size: 2rem;
  width: auto;
  height: auto;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;

const DivRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;

  @media ${phoneL} {
    width: 100%;
    height: 60%;
    justify-content: center;
    align-items: center;
  }
`;

const DivName = styled.div`
  .body-input, .categories-select {
    border-radius: 5px;
    padding: 5px 10px;
  }

  @media ${phoneL} {
    display: flex;
    height: 20%;
    width: 80%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const DivButtons = styled.div`
  align-self: flex-end;

  @media (max-width: 600px) {
    align-self: center;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class AddCategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      icon: 'fas fa-book-open',
      showIconListComponent: false,
      iconList: [],
    };
  };
  handleSubmit = ev => {
    ev.preventDefault();
    const { name, icon } = this.state;
    const newCategory = { name, icon };
    const { addCategory, historyPush, setAddCatModalRaised } = this.props;
    return Promise.resolve(setAddCatModalRaised(ev, false))
      .then(() => addCategory(newCategory, historyPush));
  };
  handleInputChange = ev => this.setState({ [ev.target.name]: ev.target.value });
  toggleIconList = () => this.setState({ showIconListComponent: !this.state.showIconListComponent });
  setIcon = icon => this.setState({ icon, showIconListComponent: false });
  componentDidMount = () => {
    const user_id = localStorage.getItem('symposium_user_id');
    const token = localStorage.getItem('symposium_token');
    const headers = { headers: { Authorization: token } };
    const { displayError } = this.props;
    return axios.get(`${ backendUrl }/categories/category-icons/${ user_id }`, headers)
      .then(res => this.setState({ iconList: res.data }))
      .catch(err => {
        const errMsg = err.response ? err.response.data.error : err.toString();
        return displayError(errMsg);
      });
  };
  render() {
    const { setAddCatModalRaised } = this.props;
    const { name, icon, iconList, showIconListComponent } = this.state;
    return (
      <ModalBackground>
        <DivModalCloser onClick={(ev) => setAddCatModalRaised(ev, false)} />
        <DivModal>
          <div className='above-input'>
            <span
              className='back'
              onClick={(ev) => setAddCatModalRaised(ev, false)}		
            ><i className="far fa-arrow-alt-circle-left"></i></span>
            <span></span>
          </div>
          <FormContent onSubmit={this.handleSubmit}>
            <DivRight>
              <DivName>
                <input
                  type='text'
                  placeholder='Add a category...'
                  name='name'
                  value={name}
                  className = 'body-input'
                  onChange={this.handleInputChange}
                  autoComplete='off'
                />
              </DivName>
            </DivRight>
            <DivLeft>
              <ImgPreview className = { icon } alt='icon' />
              <button className = 'btn' type='button' onClick={this.toggleIconList}>Select Icon From List</button>
            </DivLeft>
            <DivButtons>
                <button className = 'btn' type='submit'>Add</button>
              </DivButtons>
          </FormContent>
          {
            showIconListComponent &&
            <IconList
              selectedIcon = { icon }
              iconList = { iconList }
              toggleIconList = { this.toggleIconList }
              setIcon = { this.setIcon }
            />
          }
        </DivModal>
      </ModalBackground>
    );
  }
};

export default connect(null, { addCategory, displayError })(AddCategoryModal);
