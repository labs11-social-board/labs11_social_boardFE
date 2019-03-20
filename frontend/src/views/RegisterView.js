import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

// globals
import {
  subscriptionPlans,
  subscriptionPrices,
  stripePayFormat,
  stripeToken,
  defaultAvatar,
  phoneL,
  subscriptionFreeFeatures,
  subscriptionSilverFeatures,
  subscriptionGoldFeatures,
  subFreeStartIndex,
  subSilverStartIndex,
  subGoldStartIndex,
} from '../globals/globals.js';

// actions
import {
  register,
  displayError,
  isUsernameTaken,
  isEmailTaken,
  stripePayment
} from '../store/actions/index';
import { Avatar, ToolTip } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .tooltip {
    z-index: 9000;
    position: relative;

    &:hover {
      .tooltiptext {
        margin-top: 20px;
        visibility: visible;
        opacity: 1;
        color: white;
      }
    }
  }

  @media (max-width: 620px) {
    .tooltip {
      .tooltiptext {
        display: none;
      }
    }
  }
`;

const H1Register = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  margin: 0;
  background-color: black;
  color: white;
  font-size: 48px;
  user-select: none;

  @media ${phoneL} {
    font-size: 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DivSubscriptionPlan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
  border-bottom: 2px solid black;
  width: 100%;

  h1 {
    margin: 0 0 0.67em 0;
    text-decoration: underline;
    user-select: none;

    @media ${phoneL} {
      font-size: 24px;
    }
  }
`;

const DivSelectBanners = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;

  @media ${phoneL}{
    flex-direction: column;
  }
`;

const DivBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 390px;
  cursor: pointer;

  input {
    margin-top: 20px;
    width: 2em;
    height: 2em;
    cursor: pointer;
  }

  @media(max-width: 1080px) {
    width: 49.9%;
  }

  @media ${phoneL} {
    height: ${props =>
    props.subPlan
      ? 'auto'
      : '45px'};
    width: 100%;
    position: relative;

    input {
      margin-top: 0;
      position: absolute;
      top: ${props =>
    props.subPlan
      ? '25px'
      : '10px'};
      right: 10px;
    }
  }
`;

const DivFeatures = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;

  h2 {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    user-select: none;
    text-decoration: underline;
  }

  ul {
    padding-right: 20px;
    user-select: none;
  }

  @media ${phoneL} {
    overflow: ${props =>
    props.subPlan
      ? 'visible'
      : 'hidden'};

    h2 {
      justify-content: flex-start;
      text-decoration: none;
      margin-left: 25px;
      width: 150px;
    }
  }
`;

const DivFreePlan = styled.div`
  display: flex;
  width: 255px;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[0]
      ? '5px solid lime'
      : '5px solid transparent'};
  border-radius: 10px;
  background-color: white;
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
    
    @media ${phoneL} {
      display: ${props =>
    props.subPlan === subscriptionPlans[0]
      ? 'visible'
      : 'none'};
      top: ${props =>
    props.subPlan === subscriptionPlans[0]
    && '1px'};
      text-align: ${props =>
    props.subPlan === subscriptionPlans[0]
    && 'right'};
      right: ${props =>
    props.subPlan === subscriptionPlans[0]
    && '50px'};
    }
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[0] ? '1' : '0.6')};
  }

  @media ${phoneL} {
    width: 100%;
    border-radius: 0;
    border: none; /* remove lime selection border first */
    border-top: 4px solid black;
  }
`;

const DivSilverPlan = styled.div`
  display: flex;
  width: 255px;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[1]
      ? '5px solid lime'
      : '5px solid transparent'};
  border-radius: 10px;
  background-color: silver;
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
    
    @media ${phoneL} {
      display: ${props =>
    props.subPlan === subscriptionPlans[1]
      ? 'visible'
      : 'none'};
      top: ${props =>
    props.subPlan === subscriptionPlans[1]
    && '1px'};
      text-align: ${props =>
    props.subPlan === subscriptionPlans[1]
    && 'right'};
      right: ${props =>
    props.subPlan === subscriptionPlans[1]
    && '50px'};
    }
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[2] ? '1' : '0.6')};
  }

  @media ${phoneL} {
    width: 100%;
    border-radius: 0;
    border: none; /* remove lime selection border first */
    border-top: 4px solid black;
  }
`;

const DivGoldPlan = styled.div`
  display: flex;
  width: 255px;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[2]
      ? '5px solid lime'
      : '5px solid transparent'};
  border-radius: 10px;
  background-color: gold;
  font-weight: bold;
  height: 100%;
  position: relative;

  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
    
    @media ${phoneL} {
      display: ${props =>
    props.subPlan === subscriptionPlans[2]
      ? 'visible'
      : 'none'};
      top: ${props =>
    props.subPlan === subscriptionPlans[2]
    && '1px'};
      text-align: ${props =>
    props.subPlan === subscriptionPlans[2]
    && 'right'};
      right: ${props =>
    props.subPlan === subscriptionPlans[2]
    && '50px'};
    }
  }

  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[3] ? '1' : '0.4')};
  }

  @media ${phoneL} {
    width: 100%;
    border-radius: 0;
    border: none; /* remove lime selection border first */
    border-top: 4px solid black;
    border-bottom: 4px solid black;
  }
`;

const DivRegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
  width: 100%;
  padding: 25px 0;

  h1 {
    text-decoration: underline;
    margin: 0 0 0.67em 0;

    @media ${phoneL} {
      font-size: 24px;
    }
  }
`;

const DivAccountDetails = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  width: 100%;
  justify-content: space-between;

  @media ${phoneL} {
    flex-direction: column-reverse;
    max-width: 800px;
    width: 100%;
  }
`;

const DivLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;

  @media ${phoneL} {
    align-items: center;
    margin: 0;
  }
`;

const DivUsername = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 320px;
  margin-bottom: 10px;
`;

const LabelUsername = styled.label`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
  margin-right: 5px;
  span {
    color: red;
  }
`;

const InputUsername = styled.input`
  height: 30px;
  border-radius: 10px;
  margin-right: 5px;
  padding: 0 10px;

  &:focus {
    outline: none;
  }
`;

const DivPassword = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 320px;
  margin-bottom: 10px;
`;

const LabelPassword = styled.label`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 5px;
  margin-right: 10px;

  span {
    color: red;
  }
`;

const InputPassword = styled.input`
  height: 30px;
  border-radius: 10px;
  padding: 0 10px;

  &:focus {
    outline: none;
  }
`;

const DivEmail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 320px;
  margin-bottom: 25px;
`;

const LabelEmail = styled.label`
  font-size: 20px;
  padding-bottom: 5px;
  margin-right: 53px;
  margin-left: 14px;
`;

const InputEmail = styled.input`
  height: 30px;
  border-radius: 10px;
  margin-right: 5px;
  padding: 0 10px;

  &:focus {
    outline: none;
  }
`;

// const DivSignature = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 320px;
// `;

// const LabelSignature = styled.label`
//   font-size: 20px;
//   text-decoration: underline;
//   margin-bottom: 5px;
//   user-select: none;
// `;

// const TextareaSignature = styled.textarea`
//   width: 100%;
//   height: 100px;
//   resize: none;
//   border: 1px solid black;
//   padding: 10px;
//   user-select: ${props => props.disabled ? 'none' : 'auto'};
//   background: ${props => props.disabled ? '#c0c0c0' : 'white'};

//   &:focus {
//     outline: none;
//   }
// `;

const DivRightSide = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 25px;

  @media ${phoneL} {
    width: 80%;
    margin: 0 auto 25px;
    display: ${props => props.subPlan ? 'flex' : 'none'};
  }
`;

const DivAvatar = styled.div`
  display: flex;
  flex-direction: column;
  visibility: ${props =>
    props.subPlan === subscriptionPlans[3] ? 'show' : 'hidden'};

  .avatar {
    margin: 0 auto;
  }

  input {
    margin: 20px 0 10px;
    padding: 5px;
  }

  button {
    padding: 5px;
    cursor: pointer;
    &:hover {
      color: #d8e2e9;
      background: black;
      border: 2px solid black;
      transition: all 0.2s ease-in;
    }

    &:last-child {
      margin-top: 15px;
    }
  }
`;

const DivAvatarImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DivRegistryButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 25px 0;
  width: 100%;
  max-width: 800px;

  button {
    user-select: none;
    width: 200px;
    padding: 5px;
    background: lime;
    font-weight: bold;
    font-size: 20px;
    margin-right: 23px;
    cursor: pointer;
    border-top: 2px solid rgb(0, 234, 0);
    border-left: 2px solid rgb(0, 234, 0);
    border-bottom: 2px solid rgb(0, 150, 0);
    border-right: 2px solid rgb(0, 150, 0);
    outline: none;

    &:active {
      border-bottom: 2px solid rgb(0, 234, 0);
      border-right: 2px solid rgb(0, 234, 0);
      border-top: 2px solid rgb(0, 150, 0);
      border-left: 2px solid rgb(0, 150, 0);
    }
  }

  @media ${phoneL} {
    margin: 0;
    flex-direction: column-reverse;

    button {
      width: 100%;
      padding: 15px 0;
      margin-right: 0;
    }
  }
`;

const ButtonCancel = styled(Link)`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  width: 200px;
  padding: 5px;
  background: rgb(242, 0, 0);
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  border-top: 3px solid rgb(221, 0, 0);
  border-left: 3px solid rgb(221, 0, 0);
  border-bottom: 3px solid rgb(137, 0, 0);
  border-right: 3px solid rgb(137, 0, 0);
  outline: none;
  margin-left: 14px;

  &:active {
    border-bottom: 3px solid rgb(221, 0, 0);
    border-right: 3px solid rgb(221, 0, 0);
    border-top: 3px solid rgb(137, 0, 0);
    border-left: 3px solid rgb(137, 0, 0);
  }

  @media ${phoneL} {
    width: 100%;
    padding: 15px 0;
    margin-left: 0;
  }
`;

const DivConfirm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  h1 {
    text-decoration: underline;

    @media ${phoneL} {
      font-size: 24px;
    }
  }
`;

const DivInvoice = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
`;

const DivPaymentPlan = styled.div`
  width: 100%;
  border-bottom: 2px solid black;
  padding-bottom: 15px;
  margin-top: 0;
`;

const H3PaymentPlan = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin: 0;

  span {
    color: ${({ subPlan }) =>
    (subPlan === subscriptionPlans[1] && '#ca620d') ||
    (subPlan === subscriptionPlans[2] && '#c0c0c0') ||
    (subPlan === subscriptionPlans[3] && '#ffd700') ||
    'black'
  };
    margin-left: 15px;
  }

  @media ${phoneL} {
    font-size: 24px;
  }
`;

const DivAccoutProperties = styled.div`
  width: 100%;
  border-bottom: 2px solid black;
  padding-bottom: 15px;
`;

const DivFees = styled.div`
  border: 2px solid black;
  padding: 0 15px;
`;

const DivTotalFee = styled.div`
  border-right: 2px solid black;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
  padding: 0 15px;
`;

const H3InvoiceEntry = styled.h3`
  &:not(:first-child) {
      margin-top: 0;
    }

  span {
    margin-left: 10px;
  }
`;

const H3PaymentEntry = styled.h3`
  display: flex;
  justify-content: space-between;
`;

const SpanBoolColor = styled.span`
  color: ${props => props.subPlan ? 'green' : 'red'};
`;

const DivConfirmButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 25px 0;

  @media ${phoneL} {
    flex-direction: column-reverse;
  }
`;

const ButtonBack = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  width: 200px;
  padding: 5px;
  background: rgb(242, 242, 242);
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  border-top: 2px solid rgb(221, 221, 221);
  border-left: 2px solid rgb(221, 221, 221);
  border-bottom: 2px solid rgb(137, 137, 137);
  border-right: 2px solid rgb(137, 137, 137);
  outline: none;

  &:active {
    border-bottom: 2px solid rgb(221, 221, 221);
    border-right: 2px solid rgb(221, 221, 221);
    border-top: 2px solid rgb(137, 137, 137);
    border-left: 2px solid rgb(137, 137, 137);
  }

  @media ${phoneL} {
    width: 100%;
    padding: 18px 0;
  }
`;

const ButtonConfirm = styled.button`
  width: 200px;
  padding: 5px;
  background: lime;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  border-top: 2px solid rgb(0, 234, 0);
  border-left: 2px solid rgb(0, 234, 0);
  border-bottom: 2px solid rgb(0, 150, 0);
  border-right: 2px solid rgb(0, 150, 0);
  outline: none;

  &:active {
    border-bottom: 2px solid rgb(0, 234, 0);
    border-right: 2px solid rgb(0, 234, 0);
    border-top: 2px solid rgb(0, 150, 0);
    border-left: 2px solid rgb(0, 150, 0);
  }

  @media ${phoneL} {
    width: 100%;
    padding: 15px 0;
  }
`;

const DivStripeCheckout = styled.div``;

const ButtonStripeCheckout = styled(StripeCheckout)`
  width: 200px;

  * {
    display: flex!important;
    height: 40px!important;
    justify-content: center;
    align-items: center;
    font-size: 20px!important;
  }

  @media ${phoneL} {
    width: 100%;
    border-radius: 0!important;

    * {
      padding: 15px 0!important;
      height: auto!important;
      border-radius: 0!important;
    }
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subPlan: subscriptionPlans[0],
      username: '',
      password: '',
      email: '',
      signature: '',
      avatar: defaultAvatar,
      fileAvatarImage: '',
      avatarData: '',
      avatarURL: '',
      isReady: false
    };
  }

  //========================== Methods =========================

  componentDidMount() {
    this.setState({
      subPlan: subscriptionPlans[0],
      username: '',
      password: '',
      email: '',
      signature: '',
      avatar: defaultAvatar,
      fileAvatarImage: '',
      avatarData: '',
      avatarURL: '',
      isReady: false
    })
  }

  convertAndSetAvatarUrlToBase64 = () => {
    const url = this.state.avatarURL;

    const setAvatar = (base64) => {
      this.setState({ ...this.state, avatar: base64, fileAvatarImage: '', avatarData: '' });
    }

    let getDataUri = function (url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        let reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      xhr.open('GET', proxyUrl + url);
      xhr.responseType = 'blob';
      xhr.send();
    };

    getDataUri(url, function (base64) {
      setAvatar(base64);
    })
  }



  fileSelectHandler = ev => {
    ev.preventDefault();
    const imageFile = ev.target.files[0];
    const imageData = new FormData();
    imageData.append('imageFile', imageFile);
    imageData.append('name', imageFile.name);
    Promise.resolve(this.setState({ fileAvatarImage: imageFile, avatarData: imageData })).then(() => {
      const setAvatar = (base64) => {
        this.setState({ avatar: base64, avatarURL: '' });
      }

      const file = this.state.fileAvatarImage;
      const fd = new FormData();
      fd.append('image', file);

      let getBase64FromFile = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          cb(reader.result)
        };
        reader.onerror = function (error) {
          this.props.displayError(error);
        };
      }

      getBase64FromFile(file, function (base64) {
        setAvatar(base64);
      })
    });
  }

  selectSubPlan = sub => {
    this.setState({ subPlan: sub });
  };

  setIsReady = (ev, status) => {
    ev && ev.preventDefault();
    if (status) {
      this.props.isUsernameTaken(this.state.username).then(() => {
        if (this.props.usernameTaken) {
          return this.props.displayError('username taken');
        }

        if (this.state.email) {
          this.props.isEmailTaken(this.state.email).then(() => {
            if (this.props.emailTaken) {
              return this.props.displayError('email taken');
            }

            if (status && this.state.username && this.state.password) {
              this.setState(
                { isReady: status },
                () => !status && this.props.history.push('/home')
              );
            } else if (!status) {
              this.setState(
                { isReady: status },
                () => !status && this.props.history.push('/home')
              );
            } else {
              this.props.displayError('missing field');
            }
          });
        } else {
          if (status && this.state.username && this.state.password) {
            this.setState(
              { isReady: status },
              () => !status && this.props.history.push('/home')
            );
          } else if (!status) {
            this.setState(
              { isReady: status },
              () => !status && this.props.history.push('/home')
            );
          } else {
            this.props.displayError('missing field');
          }
        }
      });
    } else {
      this.props.history.push('/home');
    }
  };

  //---------------- Form Methods --------------
  handleInputChange = ev => {
    const chars = ev.target.value;
    if (ev.target.name === 'email') {
      this.setState(
        {
          email: chars
        },
        () => this.props.isEmailTaken(this.state.email)
      );
    } else if (ev.target.name === 'username') {
      this.setState(
        {
          username: chars
        },
        () => this.props.isUsernameTaken(this.state.username)
      );
    } else {
      this.setState({
        [ev.target.name]: ev.target.value
      });
    }
  };

  submitHandler = ev => {
    ev && ev.preventDefault();
    try {
      let newAccount;
      // prettier-ignore
      if (this.state.subPlan === subscriptionPlans[1]) { // silver
        newAccount = {
          subPlan: this.state.subPlan,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          signature: this.state.signature
        };
      } else if (this.state.subPlan === subscriptionPlans[2]) { // gold
        newAccount = {
          subPlan: this.state.subPlan,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          signature: this.state.signature,
          avatarData: this.state.avatarData,
          avatarURL: this.state.avatarURL
        };
      } else if ( // free
        this.state.subPlan === subscriptionPlans[0]
      ) {
        newAccount = {
          subPlan: this.state.subPlan,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        };
      } else { // incorrect subscription plan
        throw new Error('invalid data');
      }
      this.props.register(newAccount).then(() => this.setIsReady(null, false));
    } catch (err) {
      this.props.displayError(err);
    }
  };

  getPaymentAmount = () => {
    switch (this.state.subPlan) {
      case subscriptionPlans[1]:
        return subscriptionPrices[1]; // Silver
      case subscriptionPlans[2]:
        return subscriptionPrices[2]; // Gold
      default:
        return subscriptionPrices[0]; // Free
    }
  }

  getStripePayment = () => {
    switch (this.state.subPlan) {
      case subscriptionPlans[1]: // Silver
        return stripePayFormat[0];
      case subscriptionPlans[2]: // Gold
        return stripePayFormat[1];
      default:
        return 0;
    }
  }

  onToken = (token) => {
    const headersObj = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        stripeToken: token.id,
        payment: this.getStripePayment(),
        description: `${this.state.subPlan.toUpperCase()} Plan`,
        email: this.state.email
      }
    }
    this.props.stripePayment(headersObj).then(() => this.submitHandler());
  }

  render() {
    const paymentPlanCost = this.getPaymentAmount();
    const total = this.getPaymentAmount();
    const stripeAmount = this.getStripePayment();
    const stripeEmail = this.state.email;
    const subPlan = `${this.state.subPlan.toUpperCase()} Plan`;
    return (
      <DivWrapper>
        <H1Register>Register New Account</H1Register>
        {this.state.isReady ? (
          <DivConfirm>
            <h1>Confirm New Account Information</h1>
            <DivInvoice>
              <DivPaymentPlan>
                <H3PaymentPlan subPlan={this.state.subPlan}>Payment Plan:<span>{(this.state.subPlan).toUpperCase()}</span></H3PaymentPlan>
              </DivPaymentPlan>
              <DivAccoutProperties>
                <H3InvoiceEntry>Username:<span>{this.state.username}</span></H3InvoiceEntry>
                <H3InvoiceEntry>Email:<span>{(this.state.email) ? this.state.email : 'NONE'}</span></H3InvoiceEntry>
                <H3InvoiceEntry>Account Profile:<SpanBoolColor subPlan={subscriptionPlans.indexOf(this.state.subPlan) >= subFreeStartIndex}>YES</SpanBoolColor></H3InvoiceEntry>
                <H3InvoiceEntry>Account Settings:<SpanBoolColor subPlan={subscriptionPlans.indexOf(this.state.subPlan) >= subFreeStartIndex}>YES</SpanBoolColor></H3InvoiceEntry>
                <H3InvoiceEntry>Add Categories:<SpanBoolColor subPlan={subscriptionPlans.indexOf(this.state.subPlan) >= subSilverStartIndex}>{subscriptionPlans.indexOf(this.state.subPlan) >= subSilverStartIndex ? 'YES' : 'NO'}</SpanBoolColor></H3InvoiceEntry>
                <H3InvoiceEntry>Add Posts to Categories:<SpanBoolColor subPlan={subscriptionPlans.indexOf(this.state.subPlan) >= subFreeStartIndex}>YES</SpanBoolColor></H3InvoiceEntry>
                <H3InvoiceEntry>Add Comments to Posts:<SpanBoolColor subPlan={subscriptionPlans.indexOf(this.state.subPlan) >= subFreeStartIndex}>YES</SpanBoolColor></H3InvoiceEntry>
                <H3InvoiceEntry>Add Replies to Comments:<SpanBoolColor subPlan={subscriptionPlans.indexOf(this.state.subPlan) >= subFreeStartIndex}>YES</SpanBoolColor></H3InvoiceEntry>
                <H3InvoiceEntry>Signature:<SpanBoolColor subPlan={subscriptionPlans.indexOf(this.state.subPlan) >= subSilverStartIndex}>{(subscriptionPlans.indexOf(this.state.subPlan) >= subSilverStartIndex) ? 'YES' : 'NO'}</SpanBoolColor></H3InvoiceEntry>
                <H3InvoiceEntry>Avatar:<SpanBoolColor subPlan={subscriptionPlans.indexOf(this.state.subPlan) >= subGoldStartIndex}>{(subscriptionPlans.indexOf(this.state.subPlan) >= subGoldStartIndex) ? 'YES' : 'NO'}</SpanBoolColor></H3InvoiceEntry>
              </DivAccoutProperties>
              <DivFees>
                <H3PaymentEntry>Payment Plan Cost:<span>{paymentPlanCost}</span></H3PaymentEntry>
                <H3PaymentEntry>Taxes:<span>$0.00</span></H3PaymentEntry>
              </DivFees>
              <DivTotalFee>
                <H3PaymentEntry>Total:<span>{total}</span></H3PaymentEntry>
              </DivTotalFee>
            </DivInvoice>
            <DivConfirmButtons>
              <ButtonBack onClick={() => this.setState({ isReady: false })}>Back</ButtonBack>
              {this.state.subPlan === subscriptionPlans[0] ? (
                <ButtonConfirm onClick={ev => this.submitHandler(ev)}>Confirm</ButtonConfirm>
              ) : (
                  <DivStripeCheckout>
                    <ButtonStripeCheckout
                      token={this.onToken}
                      stripeKey={stripeToken}
                      email={stripeEmail}
                      description={subPlan}
                      amount={stripeAmount}
                    />
                  </DivStripeCheckout>
                )}
            </DivConfirmButtons>
          </DivConfirm>
        ) : (
            <Form>
              <DivSubscriptionPlan>
                <h1>Select Subscription Plan</h1>
                <DivSelectBanners>
                  <DivBanner
                    onClick={() => this.selectSubPlan(subscriptionPlans[0])}
                    subPlan={this.state.subPlan === subscriptionPlans[0]}
                  >
                    <DivFreePlan subPlan={this.state.subPlan}>
                      <DivFeatures subPlan={this.state.subPlan === subscriptionPlans[0]}>
                        <h2>Free Plan</h2>
                        <ul>
                          {
                            subscriptionFreeFeatures.map(feature => <li>{feature}</li>)
                          }
                        </ul>
                      </DivFeatures>
                      <h4>{subscriptionPrices[0]}</h4>
                    </DivFreePlan>
                    <input
                      type='radio'
                      value='free-plan'
                      name='sub-plan'
                      checked={
                        this.state.subPlan === subscriptionPlans[0]
                      }
                      readOnly
                    />
                  </DivBanner>
                  <DivBanner
                    onClick={() => this.selectSubPlan(subscriptionPlans[1])}
                    subPlan={this.state.subPlan === subscriptionPlans[1]}
                  >
                    <DivSilverPlan subPlan={this.state.subPlan}>
                      <DivFeatures subPlan={this.state.subPlan === subscriptionPlans[1]}>
                        <h2>Silver Plan</h2>
                        <ul>
                          {
                            subscriptionSilverFeatures.map(feature => <li>{feature}</li>)
                          }
                        </ul>
                      </DivFeatures>
                      <h4>{subscriptionPrices[1]}</h4>
                    </DivSilverPlan>
                    <input
                      type='radio'
                      value='silver-plan'
                      name='sub-plan'
                      checked={
                        this.state.subPlan === subscriptionPlans[1]
                      }
                      readOnly
                    />
                  </DivBanner>
                  <DivBanner
                    onClick={() => this.selectSubPlan(subscriptionPlans[2])}
                    subPlan={this.state.subPlan === subscriptionPlans[2]}
                  >
                    <DivGoldPlan subPlan={this.state.subPlan}>
                      <DivFeatures subPlan={this.state.subPlan === subscriptionPlans[2]}>
                        <h2>Gold Plan</h2>
                        <ul>
                          {
                            subscriptionGoldFeatures.map(feature => <li>{feature}</li>)
                          }
                        </ul>
                      </DivFeatures>
                      <h4>{subscriptionPrices[2]}</h4>
                    </DivGoldPlan>
                    <input
                      type='radio'
                      value='gold-plan'
                      name='sub-plan'
                      checked={
                        this.state.subPlan === subscriptionPlans[2]
                      }
                      readOnly
                    />
                  </DivBanner>
                </DivSelectBanners>
              </DivSubscriptionPlan>
              <DivRegisterForm>
                <h1>Enter New Account Details</h1>
                <DivAccountDetails>
                  <DivLeftSide>
                    <DivUsername>
                      <LabelUsername>
                        <span>*</span>&nbsp;Username
                    </LabelUsername>
                      <InputUsername
                        onChange={this.handleInputChange}
                        placeholder='Required...'
                        value={this.state.username}
                        name='username'
                        autoComplete='off'
                      />
                      {this.state.username !== '' &&
                        this.props.userExistsLoadingMessage && (
                          <img
                            src={require('../assets/gif/spinner2.gif')}
                            alt='spinner'
                          />
                        )}
                      {
                        this.state.username === "" ?
                          <span className='tooltip'>
                            <img src={require('../assets/img/redX.png')} alt='X' />
                            <ToolTip
                              text='Invalid username.' // must  be any string
                              arrow='left' // must be string that says 'top', 'right', 'left', or 'bottom'
                              width={200} // must be a number
                            />
                          </span> :
                          (!this.props.userExistsLoadingMessage &&
                            this.props.usernameTaken) && (
                            <span className='tooltip'>
                              <img src={require('../assets/img/redX.png')} alt='X' />
                              <ToolTip
                                text='Username already taken.' // must  be any string
                                arrow='left' // must be string that says 'top', 'right', 'left', or 'bottom'
                                width={200} // must be a number
                              />
                            </span>
                          )
                      }
                      {this.state.username !== '' &&
                        !this.props.userExistsLoadingMessage &&
                        !this.props.usernameTaken && (
                          <img
                            src={require('../assets/img/greenCheckmark.png')}
                            alt='checkMark'
                          />
                        )}
                    </DivUsername>
                    <DivPassword>
                      <LabelPassword>
                        <span>*</span>&nbsp;Password
                    </LabelPassword>
                      <InputPassword
                        type='password'
                        onChange={this.handleInputChange}
                        placeholder='Required...'
                        value={this.state.password}
                        name='password'
                        autoComplete='off'
                      />
                    </DivPassword>
                    <DivEmail>
                      <LabelEmail>Email</LabelEmail>
                      <InputEmail
                        onChange={this.handleInputChange}
                        placeholder='Optional...'
                        value={this.state.email}
                        name='email'
                        autoComplete='off'
                      />
                      {this.state.email !== '' &&
                        this.props.emailExistsLoadingMessage && (
                          <img
                            src={require('../assets/gif/spinner2.gif')}
                            alt='spinner'
                          />
                        )}
                      {this.state.email !== '' &&
                        !this.props.emailExistsLoadingMessage &&
                        this.props.emailTaken && (
                          <span className='tooltip'>
                            <img src={require('../assets/img/redX.png')} alt='X' />
                            <ToolTip
                              text='Email is already taken.' // must  be any string
                              arrow='left' // must be string that says 'top', 'right', 'left', or 'bottom'
                              width={200} // must be a number
                            />
                          </span>
                        )}
                      {this.state.email !== '' &&
                        !this.props.emailExistsLoadingMessage &&
                        !this.props.emailTaken && (
                          <img
                            src={require('../assets/img/greenCheckmark.png')}
                            alt='checkMark'
                          />
                        )}
                    </DivEmail>
                    {/* <DivSignature subPlan={this.state.subPlan}>
                      <LabelSignature>Signature</LabelSignature>
                      {(subscriptionPlans.indexOf(this.state.subPlan) >= subSilverStartIndex) ? (
                        <TextareaSignature
                          onChange={this.handleInputChange}
                          placeholder='Optional...'
                          value={this.state.signature}
                          name='signature'
                          autoComplete='off'
                        />
                      ) : (
                          <TextareaSignature
                            onChange={this.handleInputChange}
                            placeholder=''
                            value={this.state.signature}
                            name='signature'
                            autoComplete='off'
                            disabled
                          />
                        )}
                    </DivSignature> */}
                  </DivLeftSide>
                  <DivRightSide subPlan={this.state.subPlan === subscriptionPlans[2]}>
                    <DivAvatar subPlan={this.state.subPlan}>
                      <DivAvatarImg>
                        <Avatar height={'72px'} width={'72px'} src={this.state.avatar} />
                      </DivAvatarImg>
                      <input
                        onChange={this.handleInputChange}
                        placeholder='PNG URL...'
                        value={this.state.avatarURL}
                        name='avatarURL'
                        autoComplete='off'
                      />
                      <button type='button' onClick={() => this.convertAndSetAvatarUrlToBase64()}>Avatar URL</button>
                      <input
                        style={{ display: 'none' }}
                        type='file'
                        onChange={ev => this.fileSelectHandler(ev)}
                        value=''
                        ref={fileInput => this.fileInput = fileInput}
                      />
                      <button
                        type='button'
                        onClick={(ev) => this.fileInput.click(ev)}
                      >
                        Avatar From File
                      </button>
                    </DivAvatar>
                  </DivRightSide> */}
                </DivAccountDetails>
              </DivRegisterForm>
              <DivRegistryButtons>
                <ButtonCancel to='/'>Cancel</ButtonCancel>
                <button
                  to='/register/confirm'
                  onClick={ev => this.setIsReady(ev, true)}
                >
                  Continue
              </button>
              </DivRegistryButtons>
            </Form>
          )
        }
      </DivWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userExistsLoadingMessage: state.users.userExistsLoadingMessage,
    emailExistsLoadingMessage: state.users.emailExistsLoadingMessage,
    usernameTaken: state.users.isUsernameTaken,
    emailTaken: state.users.isEmailTaken
  };
};

export default connect(
  mapStateToProps,
  { register, displayError, isUsernameTaken, isEmailTaken, stripePayment }
)(RegisterView);